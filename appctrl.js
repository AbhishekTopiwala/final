angular.module('TaskApp', [])
  .controller('TaskController', function ($scope, $http) {
    
    $scope.tasks = [];
    $scope.newTask = {};
    $scope.editingTask = null;

    
    $scope.getTasks = function () {
      $http.get('/api/tasks')
        .then(function (response) {
          $scope.tasks = response.data;
        })
    };

    
    $scope.addTask = function () {
      $http.post('/api/tasks', $scope.newTask)
        .then(function (response) {
          $scope.tasks.push(response.data);
          $scope.newTask = {};
        })
    };

    
    $scope.editTask = function (task) {
      $scope.editingTask = angular.copy(task);
    };

    
    $scope.updateTask = function () {
      $http.put('/api/tasks/' + $scope.editingTask._id, $scope.editingTask)
        .then(function (response) {
          const index = $scope.tasks.findIndex(task => task._id === response.data._id);
          if (index !== -1) {
            $scope.tasks[index] = response.data;
          }
          $scope.editingTask = null;
        })
    };


    $scope.cancelEdit = function () {
      $scope.editingTask = null;
    };

   
    $scope.deleteTask = function (task) {
      $http.delete('/api/tasks/' +task)
        .then(function (response) {
          $scope.tasks = response.data
          $scope.getTasks();
        })
    };

    
    $scope.getTasks();
  });
