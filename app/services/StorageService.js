module.exports = function(app)
{
    'use strict';

    app.service('StorageService', function(RestService)
    {
        this.list = function()
        {
            return RestService.request({
                paths : [ 'storages' ],
                method : 'GET'
            }).then(function(response)
            {
                return response.storageKeys;
            });
        };

        this.get = function(request)
        {
            return RestService.request({
                paths : [ 'storages', request.storageName ],
                method : 'GET'
            });
        };

        this.create = function(request)
        {
            return RestService.request({
                paths : [ 'storages' ],
                method : 'POST',
                data : request
            });
        };

        this.update = function(request)
        {
            return RestService.request({
                paths : [ 'storages', request.storageName ],
                method : 'PUT',
                data : request.request
            });
        };

        this.remove = function(request)
        {
            return RestService.request({
                paths : [ 'storages', request.storageName ],
                method : 'DELETE'
            });
        };
    });
};