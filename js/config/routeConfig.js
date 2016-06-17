angular.module('todoList').config(function($routeProvider) {
    $routeProvider.when('/todolist', {
        templateUrl: 'view/todolist.html',
        controller : 'todoListCtrl',
        resolve: {
            list: function(todoListAPI){
                return todoListAPI.getTodoList();
            }
        }
    });
});
