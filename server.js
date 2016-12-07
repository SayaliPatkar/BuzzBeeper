var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('lodash');

var app = express();



app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/api/shows', function(req, res, next) {
  var query = Show.find();
  if(req.query.network){
    console.log(req.query.network);
    query.where({ network: req.query.network });
  }
  if(req.query.user){
    console.log(req.query.user);
    query.where({ subscribers:req.query.user });
  }
  else {
    console.log("in /api/shows")
    query.limit(12);
  }
  query.exec(function(err, shows) {
    if (err) return next(err);
    res.send(shows);
    console.log("Showing response data form /api/shows "+res)
  });
});

app.get('/api/shows/:id', function(req, res, next) {
  Show.findById(req.params.id, function(err, show) {
    if (err) return next(err);
    res.send(show);
  });
});

app.post('/api/shows', function(req, res, next) {
  var apiKey = '9EF1D1E7D28FDA0B';
  console.log("inside post");
  var parser = xml2js.Parser({
    explicitArray: false,
    normalizeTags: true
  });
  console.log("inside post parser conigured");
  var seriesName = req.body.showName
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^\w-]+/g, '');
  console.log(seriesName);


  async.waterfall([
    function(callback) {
      request.get('http://thetvdb.com/api/GetSeries.php?seriesname=' + seriesName, function(error, response, body) {
        if (error) return next(error);
        parser.parseString(body, function(err, result) {
          if (!result.data.series) {
            return res.send(404, { message: req.body.showName + ' was not found.' });
          }
          var seriesId = result.data.series.seriesid || result.data.series[0].seriesid;
          callback(err, seriesId);
        });
      });
    },
    function(seriesId, callback) {
      request.get('http://thetvdb.com/api/' + apiKey + '/series/' + seriesId + '/all/en.xml', function(error, response, body) {
        if (error) return next(error);
        parser.parseString(body, function(err, result) {
          var series = result.data.series;
          var episodes = result.data.episode;
          console.log("Fetched Serie :"+series.seriesname+" "+series.id+
              "\n aired on "+series.airs_dayofweek+" at "+ series.airs_time+
              "\n First Aired on "+series.firstaired+
              "\n Belongs to genere "+ series.genre);
          var show = new Show({
            _id: series.id,
            name: series.seriesname,
            airsDayOfWeek: series.airs_dayofweek,
            airsTime: series.airs_time,
            firstAired: series.firstaired,
            genre: series.genre.split('|').filter(Boolean),
            network: series.network,
            overview: series.overview,
            poster: series.poster,
            rating: series.rating,
            episodes: []
          });
            _.each(episodes, function(episode) {
                show.episodes.push({
                    season: episode.seasonnumber,
                    episodeNumber: episode.episodenumber,
                    episodeName: episode.episodename,
                    firstAired: episode.firstaired,
                    overview: episode.overview
                });
            });
          callback(err, show);
        });
      });
    },
    function(show, callback) {
      var url = 'http://thetvdb.com/banners/' + show.poster;
      request({ url: url, encoding: null }, function(error, response, body) {
        show.poster = 'data:' + response.headers['content-type'] + ';base64,' + body.toString('base64');
        callback(error, show);
      });
    }
  ], function(err, show) {
    if (err) return next(err);
    show.save(function(err) {
      if (err) {
        if (err.code == 11000) {
          return res.send(409, { message: show.name + ' already exists.' });
        }
        return next(err);
      }
      res.send(200);
    });
  });
});

app.post('/api/user', function(req, res, next) {
  var user = new User({
    _id: req.body.id
  })
  user.save(function(err) {
    if (err) {
      if (err.code == 11000) {
        return res.send(409, { message: show.name + ' already exists.' });
      }
      return next(err);
    }
    res.send(200);
    console.log("saved "+ req.body.id);
  });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var showSchema = new mongoose.Schema({
  _id: {type: String, unique: true},
  name: String,
  airsDayOfWeek: String,
  airsTime: String,
  firstAired: Date,
  genre: [String],
  network: String,
  overview: String,
  poster: String,
  rating: Number,
  subscribers: [String],
  episodes: [{
        season: Number,
        episodeNumber: Number,
        episodeName: String,
        firstAired: Date,
        overview: String
  }]
});

var userSchema = new mongoose.Schema({
  _id: {type: String, unique: true}
});

var User = mongoose.model('User', userSchema);
var Show = mongoose.model('Show', showSchema);

mongoose.connect('mongodb://localhost:27017/BuzzBeeper');//initially 'localhost'
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback){
console.log("Connection Succeeded."); /* Once the database connection has succeeded, the code in db.once is executed. */
});

app.post('/api/subscribe', function(req, res, next) {
    console.log("in post /api/subscribe"+ req.body.showId+" "+req.body.userId)
  Show.findById(req.body.showId, function(err, show) {
    if (err) return next(err);
      console.log("show found "+show.name +" has subscribers initially "+show.subscribers);
    show.subscribers.push(req.body.userId);
      console.log("show has subscribers finally "+show.subscribers);
    show.save(function(err) {
      if (err) return next(err);
      res.send(200);
    });
  });
});