module.exports = function(app)
{
    'use strict';

    var routeName = 'JobGet';
    var controllerName = routeName + 'Controller';

    app.config(function($stateProvider)
    {
        $stateProvider.state(routeName, {
            url : '/' + routeName + '/{id}',
            template : require('../templates/' + routeName + 'Template.html'),
            controller : controllerName,
            controllerAs : 'vm'
        });
    });

    app.controller(controllerName, function($stateParams, JobService)
    {
        var vm = this;

        JobService.get({
            id : $stateParams.id,
            verbose : true
        }).then(function(job)
        {
            vm.job = job;
        });
    });
};