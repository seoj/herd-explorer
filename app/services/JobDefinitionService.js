module.exports = function(app)
{
    'use strict';

    app.service('JobDefinitionService', function(RestService)
    {
        this.get = function(request)
        {
            return RestService.request({
                paths : [ 'jobDefinitions', 'namespaces', request.namespace, 'jobNames', request.jobName ],
                method : 'GET'
            });
        };
    });
};