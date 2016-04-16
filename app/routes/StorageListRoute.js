module.exports = function(app)
{
    'use strict';

    var routeName = 'StorageList';
    var controllerName = routeName + 'Controller';

    app.config(function($stateProvider)
    {
        $stateProvider.state(routeName, {
            url : '/' + routeName,
            template : require('../templates/' + routeName + 'Template.html'),
            controller : controllerName,
            controllerAs : 'vm'
        });
    });

    app.controller(controllerName, function(StorageService)
    {
        var vm = this;

        StorageService.list().then(function(storageKeys)
        {
            vm.storageKeys = storageKeys;
        });
    });
};