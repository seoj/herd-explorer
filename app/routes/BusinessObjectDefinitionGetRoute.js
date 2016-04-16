module.exports = function(app)
{
    'use strict';

    var routeName = 'BusinessObjectDefinitionGet';
    var controllerName = routeName + 'Controller';

    app.config(function($stateProvider)
    {
        $stateProvider.state(routeName, {
            url : '/' + routeName + '/{namespace}/{businessObjectDefinitionName}',
            template : require('../templates/' + routeName + 'Template.html'),
            controller : controllerName,
            controllerAs : 'vm'
        });
    });

    app.controller(controllerName, function($stateParams, BusinessObjectDefinitionService, BusinessObjectFormatService)
    {
        var vm = this;

        BusinessObjectDefinitionService.get({
            namespace : $stateParams.namespace,
            businessObjectDefinitionName : $stateParams.businessObjectDefinitionName
        }).then(function(businessObjectDefinition)
        {
            vm.namespaceKey = {
                namespaceCode : businessObjectDefinition.namespace
            };
            vm.businessObjectDefinition = businessObjectDefinition;
        });

        BusinessObjectFormatService.list({
            namespace : $stateParams.namespace,
            businessObjectDefinitionName : $stateParams.businessObjectDefinitionName
        }).then(function(businessObjectFormatKeys)
        {
            vm.businessObjectFormatKeys = businessObjectFormatKeys;
        });
    });
};