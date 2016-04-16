module.exports = function(app)
{
    'use strict';

    var _ = require('underscore');

    var routeName = 'BusinessObjectDataNotificationRegistrationGet';
    var controllerName = routeName + 'Controller';

    app.config(function($stateProvider)
    {
        $stateProvider.state(routeName, {
            url : '/' + routeName + '/{namespace}/{notificationName}',
            template : require('../templates/' + routeName + 'Template.html'),
            controller : controllerName,
            controllerAs : 'vm'
        });
    });

    app.controller(controllerName, function($stateParams, BusinessObjectDataNotificationRegistrationService)
    {
        var vm = this;

        vm.namespaceKey = {
            namespaceCode : $stateParams.namespace
        };

        BusinessObjectDataNotificationRegistrationService.get({
            namespace : $stateParams.namespace,
            notificationName : $stateParams.notificationName
        }).then(function(businessObjectDataNotificationRegistration)
        {
            vm.businessObjectDataNotificationRegistration = businessObjectDataNotificationRegistration;

            _(businessObjectDataNotificationRegistration.jobActions).each(function(jobAction)
            {
                jobAction.key = {
                    namespace : jobAction.namespace,
                    jobName : jobAction.jobName
                };
            });

            vm.businessObjectDataNotificationFilter = businessObjectDataNotificationRegistration.businessObjectDataNotificationFilter;

            vm.filterNamespaceKey = {
                namespaceCode : vm.businessObjectDataNotificationFilter.namespace
            };

            vm.filterBusinessObjectDefinitionKey = {
                namespace : vm.businessObjectDataNotificationFilter.namespace,
                businessObjectDefinitionName : vm.businessObjectDataNotificationFilter.businessObjectDefinitionName
            };
        });
    });
};