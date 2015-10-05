var db;

angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('DashCtrl', function($scope,$ionicPopup,$cordovaSQLite) {
    
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Agenda',
       template: 'Datos almacenados'
     });
   }
   
   $scope.guardar = function(persona) {
     /*console.log("Nombre:" +persona.nombre );
     console.log("Apellido: " + persona.apellido);
     console.log("Telefono: " + persona.telefono);
     console.log("Email: " + persona.email);
     */
  /*  var alertPopup = $ionicPopup.alert({
       title: 'Agenda',
       template: 'Datos almacenados'
     });
     
     */
         if(window.cordova) {
      // App syntax
      db = $cordovaSQLite.openDB("agenda.db");
    } else {
      // Ionic serve syntax
      db = window.openDatabase("agenda.db", "1", "My app", -1);
    }
$cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS personas (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre varchar(255), apellido varchar(255), telefono varchar(255), email varchar(255))');
  
        $cordovaSQLite.execute(db, 'INSERT INTO personas (nombre,apellido,telefono,email) VALUES (?,?,?,?)', [persona.nombre,persona.apellido,persona.telefono,persona.email])
        .then(function(result) {
            $scope.statusMessage = "Registro guardado";
             
             
             
        var alertPopup = $ionicPopup.alert({
       title: 'Agenda',
       template: 'Datos almacenados'
     });
     
     
     
    
        }, function(error) {
            $scope.statusMessage = "Error: " + error.message;
        })
         
     
     
     
     
   }
   
   
   
   
})

.controller('ChatsCtrl', function($scope, Chats,$ionicPopup,$cordovaSQLite) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
     if(window.cordova) {
      // App syntax
      db = $cordovaSQLite.openDB("agenda.db");
    } else {
      // Ionic serve syntax
      db = window.openDatabase("agenda.db", "1", "My app", -1);
    }
$cordovaSQLite.execute(db, 'SELECT * FROM personas ORDER BY id DESC')
            .then(
                function(result) {
 
                    if (result.rows.length > 0) {
 			for(var i=0;i<result.rows.length;i++)
			{
			
			$scope.chats = result.rows.item(i).apellido;
                        }
                    }
                },
                function(error) {
                    $scope.statusMessage = "Error on loading: " + error.message;
                }
            );
  //$scope.chats = Chats.all();
  //$scope.remove = function(chat) {
//    Chats.remove(chat);
 // };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


