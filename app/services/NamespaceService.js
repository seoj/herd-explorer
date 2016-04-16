module.exports = function(app)
{
    'use strict';

    app.service('NamespaceService', function(RestService)
    {
        this.list = function()
        {
            return RestService.request({
                paths : [ 'namespaces' ],
                method : 'GET'
            }).then(function(response)
            {
                return response.namespaceKeys;
            });
        };

        this.get = function(request)
        {
            return RestService.request({
                paths : [ 'namespaces', request.namespaceCode ],
                method : 'GET'
            });
        };

        this.create = function(request)
        {
            return RestService.request({
                paths : [ 'namespaces' ],
                method : 'POST',
                data : request.data
            });
        };

        this.remove = function(request)
        {
            return RestService.request({
                paths : [ 'namespaces', request.namespaceCode ],
                method : 'DELETE'
            });
        };
    });
};