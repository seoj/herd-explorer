module.exports = function(app)
{
    'use strict';

    var _ = require('underscore');

    app.service('BusinessObjectDataService', function(RestService)
    {
        this.getAvailability = function(request)
        {
            return RestService.request({
                paths : [ 'businessObjectData', 'availability' ],
                method : 'POST',
                data : request
            });
        };

        this.get = function(request)
        {
            var subPartitionValues = null;
            if (request.subPartitionValues && request.subPartitionValues.length > 0)
            {
                subPartitionValues = [];
                _(request.subPartitionValues).each(function(subPartitionValue)
                {
                    subPartitionValues.push(subPartitionValue);
                });
                subPartitionValues = subPartitionValues.join('|');
            }

            return RestService.request({
                paths : [ 'businessObjectData', 'namespaces', request.namespace, 'businessObjectDefinitionNames', request.businessObjectDefinitionName,
                    'businessObjectFormatUsages', request.businessObjectFormatUsage, 'businessObjectFormatFileTypes', request.businessObjectFormatFileType ],
                params : {
                    partitionKey : request.partitionKey,
                    partitionValue : request.partitionValue,
                    subPartitionValues : subPartitionValues,
                    businessObjectFormatVersion : request.businessObjectFormatVersion,
                    businessObjectDataVersion : request.businessObjectDataVersion,
                    businessObjectDataStatus : request.businessObjectDataStatus
                },
                method : 'GET'
            });
        };

        this.create = function(request)
        {
            return RestService.request({
                paths : [ 'businessObjectData' ],
                method : 'POST',
                data : request.data
            });
        };

        this.generateDdl = function(request)
        {
            return RestService.request({
                paths : [ 'businessObjectData', 'generateDdl' ],
                method : 'POST',
                data : request
            });
        };
    });
};