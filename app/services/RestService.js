module.exports = function(app)
{
    'use strict';

    app.service('RestService', function($http)
    {
        this.request = function(request)
        {
            return $http({
                url : [ '/herd-app/rest' ].concat(request.paths).join('/'),
                params : request.params,
                method : request.method,
                data : request.data,
                cache : request.cache
            }).then(function(response)
            {
                return response.data;
            });
        };
    });
};