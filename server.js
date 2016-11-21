var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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
  query.where({ network: req.query.network });
  query.exec(function(err, shows) {
    if (err) return next(err);
    res.send(shows);
  });
});

app.get('/api/shows/:id', function(req, res, next) {
  Show.findById(req.params.id, function(err, show) {
    if (err) return next(err);
    res.send(show);
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
  airsDaysOfWeek: [String],
  airsTime: String,
  firstAired: Date,
  genre: [String],
  network: String,
  overview: String,
  image: String
});

var userSchema = new mongoose.Schema({
  _id: {type: String, unique: true},
  subscriptions : [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Show'
  }]
});

var User = mongoose.model('User', userSchema);
var Show = mongoose.model('Show', showSchema);

mongoose.connect('localhost');