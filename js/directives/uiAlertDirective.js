angular.module('todoList').directive('uiAlert', function () {
    return {
        templateUrl: 'view/alert.html',
        scope: {
            topic: '@title',
            success: '=message'

        }
    };
});
