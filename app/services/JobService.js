module.exports = function(app)
{
    'use strict';

    app.service('JobService', function(RestService)
    {
        this.list = function(request)
        {
            return RestService.request({
                paths : [ 'jobs' ],
                params : {
                    namespace : request.namespace,
                    jobName : request.jobName,
                    status : request.status
                },
                method : 'GET'
            }).then(function(response)
            {
                return response.jobSummaries;
            });
        };

        this.get = function(request)
        {
            return RestService.request({
                paths : [ 'jobs', 'ids', request.id ],
                params : {
                    verbose : request.verbose
                },
                method : 'GET'
            });
        };
    });
};