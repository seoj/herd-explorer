module.exports = function(app)
{
    'use strict';

    var routeName = 'NamespaceGet';
    var controllerName = routeName + 'Controller';

    app.config(function($stateProvider)
    {
        $stateProvider.state(routeName, {
            url : '/' + routeName + '/{namespaceCode}',
            template : require('../templates/' + routeName + 'Template.html'),
            controller : controllerName,
            controllerAs : 'vm'
        });
    });

    app.controller(controllerName, function($stateParams, NamespaceService, BusinessObjectDefinitionService)
    {
        var vm = this;

        NamespaceService.get({
            namespaceCode : $stateParams.namespaceCode
        }).then(function(namespace)
        {
            vm.namespace = namespace;
        });

        BusinessObjectDefinitionService.list({
            namespace : $stateParams.namespaceCode
        }).then(function(businessObjectDefinitionKeys)
        {
            vm.businessObjectDefinitionKeys = businessObjectDefinitionKeys;
        });
    });
};