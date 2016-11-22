/**
 * Created by SAYALI on 21-11-2016.
 */
angular.module('MyApp')
    .controller('UserCtrl', function() {

        document.getElementById('myNavbar').innerHTML = '<ul class="nav navbar-nav navbar-right"> <li data-match-route="/userpage"><a href="/userpage">Home</a></li> <li data-match-route="/channels"><a href="/channels">Channels</a></li> <li data-match-route="/contactus"><a href="/contactus">Contact Us</a></li><ul class="nav navbar-nav pull-right" id="logoutPane"> <li><a onclick="logout()" href="javascript:void(0);"">Logout</a></li> </ul> </ul>';

    });
