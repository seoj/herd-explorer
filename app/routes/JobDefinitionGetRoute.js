module.exports = function(app)
{
    'use strict';

    var routeName = 'JobDefinitionGet';
    var controllerName = routeName + 'Controller';

    app.config(function($stateProvider)
    {
        $stateProvider.state(routeName, {
            url : '/' + routeName + '/{namespace}?{jobName}',
            template : require('../templates/' + routeName + 'Template.html'),
            controller : controllerName,
            controllerAs : 'vm'
        });
    });

    app.controller(controllerName, function($state, $stateParams, JobDefinitionService)
    {
        var vm = this;

        vm.form = {};
        vm.form.namespace = $stateParams.namespace;
        vm.form.jobName = $stateParams.jobName;

        vm.getJobDefinition = function()
        {
            vm.jobDefinition = null;
            vm.error = null;

            JobDefinitionService.get(vm.form).then(function(jobDefinition)
            {
                vm.jobDefinition = jobDefinition;
                vm.jobDefinitionKey = {
                    namespace : jobDefinition.namespace,
                    jobName : jobDefinition.jobName
                };

                $state.go(routeName, {
                    namespace : jobDefinition.namespace,
                    jobName : jobDefinition.jobName
                }, {
                    notify : false
                });
            }, function(response)
            {
                vm.error = response.data.message;
            });
        };

        if (vm.form.jobName)
        {
            vm.getJobDefinition();
        }
    });
};