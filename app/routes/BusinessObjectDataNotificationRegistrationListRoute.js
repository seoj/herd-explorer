module.exports = function(app)
{
    'use strict';

    var routeName = 'BusinessObjectDataNotificationRegistrationList';
    var controllerName = routeName + 'Controller';

    app.config(function($stateProvider)
    {
        $stateProvider.state(routeName, {
            url : '/' + routeName + '/{namespace}',
            template : require('../templates/' + routeName + 'Template.html'),
            controller : controllerName,
            controllerAs : 'vm'
        });
    });

    app.controller(controllerName, function($stateParams, BusinessObjectDataNotificationRegistrationService)
    {
        var vm = this;

        vm.namespace = $stateParams.namespace;

        BusinessObjectDataNotificationRegistrationService.list({
            namespace : $stateParams.namespace
        }).then(function(businessObjectDataNotificationRegistrationKeys)
        {
            vm.businessObjectDataNotificationRegistrationKeys = businessObjectDataNotificationRegistrationKeys;
        });
    });
};