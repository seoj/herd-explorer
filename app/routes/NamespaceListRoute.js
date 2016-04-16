module.exports = function(app)
{
    'use strict';

    var routeName = 'NamespaceList';
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

    app.controller(controllerName, function(NamespaceService)
    {
        var vm = this;

        NamespaceService.list().then(function(namespaceKeys)
        {
            vm.namespaceKeys = namespaceKeys;
        });
    });
};