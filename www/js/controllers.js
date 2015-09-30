angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicPopup) {
    
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
     $cordovaSQLite.execute(db, 'INSERT INTO personas (nombre,apellido,telefono,email) VALUES (?,?,?,?)', [persona.nombre,persona.apellido,persona.telefono,persona.email])
        .then(function(result) {
            $scope.statusMessage = "Registro guardado";
        }, function(error) {
            $scope.statusMessage = "Error: " + error.message;
        })
     
   }
   
   
   
   
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


