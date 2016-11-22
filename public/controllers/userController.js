/**
 * Created by SAYALI on 21-11-2016.
 */
angular.module('MyApp')
    .controller('UserCtrl', function() {

        document.getElementById('myNavbar').innerHTML = '<ul class="nav navbar-nav navbar-right"> <li data-match-route="/userpage"><a href="/userpage">Home</a></li> <li data-match-route="/channels"><a href="/channels">Channels</a></li> <li data-match-route="/contactus"><a href="/contactus">Contact Us</a></li><ul class="nav navbar-nav pull-right" id="logoutPane"> <li><a onclick="logout()" href="javascript:void(0);"">Logout</a></li> </ul> </ul>';
 var data ='[{ "id" : "1","image":"../images/Demo2.jpg", "name" : "Game of thrones","airsDaysOfWeek" : ["Monday","Wednesday"], "airsTime": "11:00 am",	"firstAired":"2013-05-05 11:00",	"genre":"action",	"network":"abc","overview":"description description description description description description description description description"},{"id" : "2","image":"../images/Demo1.jpg","name" : "Friends","airsDaysOfWeek" : ["Monday","Wednesday","Saturday"],"airsTime": "1:00 am","firstAired":"2013-05-05 1:00","genre":"action","network":"abc","overview":"description description description description description description description description description"},{ "id" : "3","image":"../images/Demo3.jpg", "name" : "XYZ","airsDaysOfWeek" : ["Monday","Wednesday"], "airsTime": "11:00 am",	"firstAired":"2013-05-05 11:00",	"genre":"action",	"network":"abc","overview":"description description description description description description description description description"},{"id" : "4","image":"../images/demo4.jpg","name" : "Friends","airsDaysOfWeek" : ["Monday","Wednesday","Saturday"],"airsTime": "1:00 am","firstAired":"2013-05-05 1:00","genre":"action","network":"abc","overview":"description description description description description description description description description"}]';
       var json = JSON.parse(data);


        for(var i=0;i<json.length;i++) {
            var sub=json[i].overview.substring(0,60);
            document.getElementById('createList').innerHTML += '<tr><td style="padding: 4px !important;"><img src="'+json[i].image+'" height="500" width="393" style="height: 250px;width: 240px;"/></td><td>'+
                '<table><tr><td ><p class="caroselP">'+json[i].name+'</p></td></tr>'+'' +
                '<tr><td><p class="caroselPdays" >'+json[i].airsDaysOfWeek+'</p></td></tr><tr><td>'+'' +
                '<p class="caroselPoverview" maxlength="1">'+sub+'</p></td></tr><tr><td><button class="readMoreBtn">Read More</button></td></tr></table>'+
                '</td></tr>';

        }

    });





