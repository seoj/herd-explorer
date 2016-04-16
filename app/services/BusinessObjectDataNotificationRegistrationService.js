module.exports = function(app)
{
    'use strict';

    app.service('BusinessObjectDataNotificationRegistrationService', function(RestService)
    {
        this.list = function(request)
        {
            return RestService.request({
                paths : [ 'notificationRegistrations', 'businessObjectDataNotificationRegistrations', 'namespaces', request.namespace ],
                method : 'GET'
            }).then(function(response)
            {
                return response.businessObjectDataNotificationRegistrationKeys;
            });
        };

        this.get = function(request)
        {
            return RestService.request({
                paths : [ 'notificationRegistrations', 'businessObjectDataNotificationRegistrations', 'namespaces', request.namespace, 'notificationNames',
                    request.notificationName ],
                method : 'GET'
            });
        };
    });
};