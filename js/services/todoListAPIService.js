
angular.module('todoList').factory('todoListAPI', function($http, config){

    var _getTodoList = function () {
        return $http.get(config.baseUrl + '/list');
    };

    var _getTodoItem = function (id) {
        console.log(id);
        return $http.get(config.baseUrl + '/list-item/' + id);
    };
    var _removeItem = function (id) {
        console.log(id);
        return $http.delete(config.baseUrl + '/list-item-remove/' + id);
    };

    var _editItem = function (item){
        console.log(item);
        return $http({
            url: config.baseUrl + '/list-item-edit/' + item._id,
            headers : {
                'Content-Type' : 'application/json; charset=utf-8'
            },
            method: 'PUT',
            data: {
                'params':{
                    'text': item.text
                }
            }
        });
    };

    var _addItem = function (item) {
        console.log(item);
        return $http({
            url: config.baseUrl + '/list-item-add/',
            headers : {
                'Content-Type' : 'application/json; charset=utf-8'
            },
            method: 'POST',
            data: {
                'params':{
                    'text': item.text,
                    'date': new Date()
                }
            }
        });
    };


    return {
        getTodoList: _getTodoList,
        getTodoItem: _getTodoItem,
        removeItem: _removeItem,
        addItem: _addItem,
        editItem: _editItem
    };
});
