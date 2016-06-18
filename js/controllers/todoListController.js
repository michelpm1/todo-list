angular.module('todoList').controller('todoListCtrl', function($scope, list, todoListAPI, $fancyModal, $timeout){
    $scope.list = list.data;
    $scope.show = false;

    var pagesShown = 1;

    var pageSize = 4;

    $scope.paginationLimit = function() {
        return pageSize * pagesShown;
    };
    

    $scope.showMoreItems = function() {
        pagesShown = pagesShown + 1;
    };


    $scope.open = function () {
        $fancyModal.open({ templateUrl: '/partials/form.html', scope : $scope});
        console.log($fancyModal);
    };

    $scope.close = function () {
        $fancyModal.close();
    };

    $scope.edit = function (item) {
        $scope.item = item;
        $fancyModal.open({ templateUrl: '/partials/edit.html', scope : $scope});
    };

    $scope.sendEdit = function (item){
        todoListAPI.editItem(item);
    };
    $scope.remove = function (item) {
        console.log(item);
        todoListAPI.removeItem(item._id).success(function (){
            $scope.success = 'Your reminder was removed!';
            $scope.show = true;
            $timeout(function() {
                $scope.show = false;
            }, 5000);

        });
        for (var i in list.data) {
            if (list.data [i] === item) {
                $scope.list.splice(i, 1);
            }
        }

    };
    $scope.add = function (item) {
        console.log(item);

        todoListAPI.addItem(item).success(function(data){
            listUpdate = $scope.list;
            listUpdate.push(data);
            $scope.list = listUpdate;

        });


    };




}

);
