module.exports = function(app)
{
    'use strict';

    var routeName = 'JobList';
    var controllerName = routeName + 'Controller';

    app.config(function($stateProvider)
    {
        $stateProvider.state(routeName, {
            url : '/' + routeName + '/{namespace}/{jobName}?{status}',
            template : require('../templates/' + routeName + 'Template.html'),
            controller : controllerName,
            controllerAs : 'vm'
        });
    });

    app.controller(controllerName, function($state, $stateParams, JobService)
    {
        var vm = this;

        vm.form = {
            namespace : $stateParams.namespace,
            jobName : $stateParams.jobName,
            status : $stateParams.status
        };

        vm.namespaceKey = {
            namespaceCode : $stateParams.namespace
        };

        vm.jobDefinitionKey = {
            namespace : $stateParams.namespace,
            jobName : $stateParams.jobName
        };

        vm.statuses = [ 'RUNNING', 'COMPLETED' ];

        vm.getJobs = function()
        {
            vm.jobSummaries = null;
            vm.error = null;

            JobService.list(vm.form).then(function(jobSummaries)
            {
                vm.jobSummaries = jobSummaries;

                $state.go(routeName, vm.form, {
                    notify : false
                });

            }, function(response)
            {
                vm.error = response.data.message;
            });
        };

        vm.getJobs();
    });
};