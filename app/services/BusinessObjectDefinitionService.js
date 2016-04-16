module.exports = function(app)
{
    'use strict';

    app.service('BusinessObjectDefinitionService', function(RestService)
    {
        this.list = function(request)
        {
            return RestService.request({
                paths : [ 'businessObjectDefinitions', 'namespaces', request.namespace ],
                method : 'GET'
            }).then(function(response)
            {
                return response.businessObjectDefinitionKeys;
            });
        };

        this.get = function(request)
        {
            return RestService
                .request({
                    paths : [ 'businessObjectDefinitions', 'namespaces', request.namespace, 'businessObjectDefinitionNames',
                        request.businessObjectDefinitionName ],
                    method : 'GET'
                });
        };

        this.create = function()
        {
            return RestService.request({
                paths : [ 'businessObjectDefinitions' ],
                method : 'POST'
            });
        };

        this.update = function(request)
        {
            return RestService
                .request({
                    paths : [ 'businessObjectDefinitions', 'namespaces', request.namespace, 'businessObjectDefinitionNames',
                        request.businessObjectDefinitionName ],
                    method : 'PUT',
                    data : request.request
                });
        };

        this.remove = function(request)
        {
            return RestService
                .request({
                    paths : [ 'businessObjectDefinitions', 'namespaces', request.namespace, 'businessObjectDefinitionNames',
                        request.businessObjectDefinitionName ],
                    method : 'DELETE'
                });
        };
    });
};