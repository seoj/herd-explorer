module.exports = function(app)
{
    'use strict';

    var _ = require('underscore');

    var routeName = 'BusinessObjectDataGet';
    var controllerName = routeName + 'Controller';

    app.config(function($stateProvider)
    {
        $stateProvider.state(routeName, {
            url : '/' + routeName + '?{businessObjectDataKey:json}',
            template : require('../templates/' + routeName + 'Template.html'),
            controller : controllerName,
            controllerAs : 'vm'
        });
    });

    app.controller(controllerName, function($stateParams, BusinessObjectDataService)
    {
        var vm = this;

        var businessObjectDataKey = $stateParams.businessObjectDataKey;
        if (businessObjectDataKey)
        {
            BusinessObjectDataService.get(businessObjectDataKey).then(function(businessObjectData)
            {
                vm.businessObjectData = businessObjectData;
                vm.businessObjectData.partitionValues = [ vm.businessObjectData.partitionValue ].concat(vm.businessObjectData.subPartitionValues);

                _(businessObjectData.businessObjectDataParents).each(function(businessObjectDataParent)
                {
                    businessObjectDataParent.namespaceKey = {
                        namespaceCode : businessObjectDataParent.namespace
                    };

                    businessObjectDataParent.businessObjectDefinitionKey = {
                        namespace : businessObjectDataParent.namespace,
                        businessObjectDefinitionName : businessObjectDataParent.businessObjectDefinitionName
                    };

                    businessObjectDataParent.businessObjectFormatKey = {
                        namespace : businessObjectDataParent.namespace,
                        businessObjectDefinitionName : businessObjectDataParent.businessObjectDefinitionName,
                        businessObjectFormatUsage : businessObjectDataParent.businessObjectFormatUsage,
                        businessObjectFormatFileType : businessObjectDataParent.businessObjectFormatFileType,
                        businessObjectFormatVersion : businessObjectDataParent.businessObjectFormatVersion
                    };
                });

                _(businessObjectData.businessObjectDataChildren).each(function(businessObjectDataChild)
                {
                    businessObjectDataChild.namespaceKey = {
                        namespaceCode : businessObjectDataChild.namespace
                    };

                    businessObjectDataChild.businessObjectDefinitionKey = {
                        namespace : businessObjectDataChild.namespace,
                        businessObjectDefinitionName : businessObjectDataChild.businessObjectDefinitionName
                    };

                    businessObjectDataChild.businessObjectFormatKey = {
                        namespace : businessObjectDataChild.namespace,
                        businessObjectDefinitionName : businessObjectDataChild.businessObjectDefinitionName,
                        businessObjectFormatUsage : businessObjectDataChild.businessObjectFormatUsage,
                        businessObjectFormatFileType : businessObjectDataChild.businessObjectFormatFileType,
                        businessObjectFormatVersion : businessObjectDataChild.businessObjectFormatVersion
                    };
                });

                vm.namespaceKey = {
                    namespaceCode : businessObjectData.namespace
                };

                vm.businessObjectDefinitionKey = {
                    namespace : businessObjectData.namespace,
                    businessObjectDefinitionName : businessObjectData.businessObjectDefinitionName
                };

                vm.businessObjectFormatKey = {
                    namespace : businessObjectData.namespace,
                    businessObjectDefinitionName : businessObjectData.businessObjectDefinitionName,
                    businessObjectFormatUsage : businessObjectData.businessObjectFormatUsage,
                    businessObjectFormatFileType : businessObjectData.businessObjectFormatFileType,
                    businessObjectFormatVersion : businessObjectData.businessObjectFormatVersion
                };
            });
        }
    });
};