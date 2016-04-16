module.exports = function(app)
{
    'use strict';

    var routeName = 'BusinessObjectFormatGet';
    var controllerName = routeName + 'Controller';

    app.config(function($stateProvider)
    {
        $stateProvider.state(routeName, {
            url : '/' + routeName + '/{namespace}/{businessObjectDefinitionName}/{businessObjectFormatUsage}/{businessObjectFormatFileType}/' +
                '{businessObjectFormatVersion}',
            template : require('../templates/' + routeName + 'Template.html'),
            controller : controllerName,
            controllerAs : 'vm'
        });
    });

    app.controller(controllerName, function($stateParams, BusinessObjectFormatService)
    {
        var vm = this;

        BusinessObjectFormatService.get({
            namespace : $stateParams.namespace,
            businessObjectDefinitionName : $stateParams.businessObjectDefinitionName,
            businessObjectFormatUsage : $stateParams.businessObjectFormatUsage,
            businessObjectFormatFileType : $stateParams.businessObjectFormatFileType,
            businessObjectFormatVersion : $stateParams.businessObjectFormatVersion && parseInt($stateParams.businessObjectFormatVersion)
        }).then(function(businessObjectFormat)
        {
            vm.businessObjectFormat = businessObjectFormat;

            vm.namespaceKey = {
                namespaceCode : businessObjectFormat.namespace
            };

            vm.businessObjectDefinitionKey = {
                namespace : businessObjectFormat.namespace,
                businessObjectDefinitionName : businessObjectFormat.businessObjectDefinitionName
            };

            vm.businessObjectFormatKey = {
                namespace : businessObjectFormat.namespace,
                businessObjectDefinitionName : businessObjectFormat.businessObjectDefinitionName,
                businessObjectFormatUsage : businessObjectFormat.businessObjectFormatUsage,
                businessObjectFormatFileType : businessObjectFormat.businessObjectFormatFileType,
                businessObjectFormatVersion : businessObjectFormat.businessObjectFormatVersion
            };
        });
    });
};