module.exports = function(app)
{
    'use strict';

    var routeName = 'StorageGet';
    var controllerName = routeName + 'Controller';

    app.config(function($stateProvider)
    {
        $stateProvider.state(routeName, {
            url : '/' + routeName + '/{storageName}',
            template : require('../templates/' + routeName + 'Template.html'),
            controller : controllerName,
            controllerAs : 'vm'
        });
    });

    app.controller(controllerName, function($stateParams, StorageService)
    {
        var vm = this;

        StorageService.get({
            storageName : $stateParams.storageName
        }).then(function(storage)
        {
            vm.storage = storage;
        });
    });
};