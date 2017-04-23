//Common APP Variables
  var apiKey = 'AIzaSyDrwT9j3KRnSxVxXWIWVz66C2gkSxP2VJY';
  var discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"];
  var clientId = '46218223633-3cesj6svv1naqn45d1ssqh3nh94k7n8q.apps.googleusercontent.com';
  var scopes = 'profile';
  var authorizeButton = document.getElementById('authorize-button');
  var name;

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});

function auth2() {
        // Load the API client and auth2 library
        gapi.load('client:auth2', initClient);
}
function initClient() {
        gapi.client.init({
            apiKey: apiKey,
            discoveryDocs: discoveryDocs,
            clientId: clientId,
            scope: scopes
        }).then(function () {
          // Handle the initial sign-in state.
          if(gapi.auth2.getAuthInstance().isSignedIn.get()) {
              makeApiCall();
          }
            if(authorizeButton)
            authorizeButton.onclick = handleAuthClick;

        });
    }

      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
          makeApiCall();
           // window.location.href = '/public/index.html?name='+name;
   
      }
      // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall() {
        gapi.client.people.people.get({
          resourceName: 'people/me'
        }).then(function(resp) {
        name = resp.result.names[0].givenName;
        if ( window.location.href !=  'http://localhost:3000/index.html?name='+name ) //replace with contains
            window.location.href = '/index.html?name='+name;
        });
    }

//Login App | Login Controller
var loginApp = angular.module('loginApp', []);
loginApp.controller("LoginController", function ($scope, $http) {
      $scope.handleClientLoad = function () {
          auth2();
      };
      

});

//Index App | Home Page Controller
var app = angular.module('myApp', []);
app.controller("mainController", function ($scope, $http, $location) {
   
    $scope.name = $location.absUrl().split('?')[1].split("=")[1];
    $scope.handleClientLoad = function () {
          auth2(); 
        if(!gapi.auth2.getAuthInstance().isSignedIn.get())
        window.location.href = '/login.html';
      };
        
    
  $http.get('http://localhost:3000/mySystem')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
        $scope.todos="error!"
            console.log('Error: ' + data);
        });

  $scope.getPersonData = function() {
      $http.get('http://localhost:3000/person?name='+$scope.name)
        .success(function(data) {
         
            $scope.person = data;
            $scope.modes = data[0].mode;
            $scope.myMap();
          
        })
        .error(function(data) {
        $scope.todos="error!"
            console.log('Error: ' + data);
        });
                                    
};
    
    $scope.myMap = function () {
    var mapProp= {
        center:new google.maps.LatLng($scope.person[0].home.lat,$scope.person[0].home.long),
        zoom:20,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
};
  
    $scope.LogOut = function(){
     gapi.auth2.getAuthInstance().signOut();
     if(!gapi.auth2.getAuthInstance().isSignedIn.get())
        window.location.href = '/login.html';
};
   
$scope.getPersonData();    
});

