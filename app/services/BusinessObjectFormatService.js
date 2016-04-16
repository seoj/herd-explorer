module.exports = function(app)
{
    'use strict';

    app.service('BusinessObjectFormatService', function(RestService)
    {
        this.list = function(request)
        {
            return RestService.request({
                paths : [ 'businessObjectFormats', 'namespaces', request.namespace, 'businessObjectDefinitionNames', request.businessObjectDefinitionName ],
                params : {
                    latestBusinessObjectFormatVersion : request.latestBusinessObjectFormatVersion
                },
                method : 'GET'
            }).then(function(response)
            {
                return response.businessObjectFormatKeys;
            });
        };

        this.get = function(request)
        {
            return RestService.request({
                paths : [ 'businessObjectFormats', 'namespaces', request.namespace, 'businessObjectDefinitionNames', request.businessObjectDefinitionName,
                    'businessObjectFormatUsages', request.businessObjectFormatUsage, 'businessObjectFormatFileTypes', request.businessObjectFormatFileType ],
                params : {
                    businessObjectFormatVersion : request.businessObjectFormatVersion
                },
                method : 'GET'
            });
        };

        this.create = function(request)
        {
            return RestService.request({
                paths : [ 'businessObjectFormats' ],
                method : 'POST',
                data : request
            });
        };

        this.update = function(request)
        {
            return RestService.request({
                paths : [ 'businessObjectFormats', 'namespaces', request.namespace, 'businessObjectDefinitionNames', request.businessObjectDefinitionName,
                    'businessObjectFormatUsages', request.businessObjectFormatUsage, 'businessObjectFormatFileTypes', request.businessObjectFormatFileType,
                    'businessObjectFormatVersions', request.businessObjectFormatVersion ],
                method : 'PUT',
                data : request.request
            });
        };

        this.remove = function(request)
        {
            return RestService.request({
                paths : [ 'businessObjectFormats', 'namespaces', request.namespace, 'businessObjectDefinitionNames', request.businessObjectDefinitionName,
                    'businessObjectFormatUsages', request.businessObjectFormatUsage, 'businessObjectFormatFileTypes', request.businessObjectFormatFileType,
                    'businessObjectFormatVersions', request.businessObjectFormatVersion ],
                method : 'DELETE'
            });
        };
    });
};