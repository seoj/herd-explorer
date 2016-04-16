module.exports = function(app)
{
    'use strict';

    var angular = require('angular');
    var _ = require('underscore');

    var routeName = 'BusinessObjectDataGetAvailabilityAndDdl';
    var controllerName = routeName + 'Controller';

    app.config(function($stateProvider)
    {
        $stateProvider.state(routeName, {
            url : '/' + routeName + '?{form}',
            template : require('../templates/' + routeName + 'Template.html'),
            controller : controllerName,
            controllerAs : 'vm'
        });
    });

    app.controller(controllerName, function($state, $stateParams, BusinessObjectFormatService, FormService, BusinessObjectDataService)
    {
        var vm = this;

        vm.form = $stateParams.form ? angular.fromJson($stateParams.form) : {};
        vm.form.partitionValueFilters = vm.form.partitionValueFilters || [];

        vm.namespaceKey = {
            namespaceCode : vm.form.namespace
        };

        vm.businessObjectDefinitionKey = {
            namespace : vm.form.namespace,
            businessObjectDefinitionName : vm.form.businessObjectDefinitionName
        };

        vm.businessObjectFormatKey = {
            namespace : vm.form.namespace,
            businessObjectDefinitionName : vm.form.businessObjectDefinitionName,
            businessObjectFormatUsage : vm.form.businessObjectFormatUsage,
            businessObjectFormatFileType : vm.form.businessObjectFormatFileType,
            businessObjectFormatVersion : vm.form.businessObjectFormatVersion
        };

        BusinessObjectFormatService.get({
            namespace : vm.form.namespace,
            businessObjectDefinitionName : vm.form.businessObjectDefinitionName,
            businessObjectFormatUsage : vm.form.businessObjectFormatUsage,
            businessObjectFormatFileType : vm.form.businessObjectFormatFileType,
            businessObjectFormatVersion : vm.form.businessObjectFormatVersion
        }).then(function(businessObjectFormat)
        {
            vm.businessObjectFormat = businessObjectFormat;

            vm.partitionKeys = [];
            if (vm.businessObjectFormat.schema && vm.businessObjectFormat.schema.partitions && vm.businessObjectFormat.schema.partitions.length > 0)
            {
                _(vm.businessObjectFormat.schema.partitions).each(function(partition)
                {
                    vm.partitionKeys.push(partition.name);
                });
            }
            else
            {
                vm.partitionKeys.push(vm.businessObjectFormat.partitionKey);
            }

            _(vm.partitionKeys).each(function(partitionKey, index)
            {
                vm.form.partitionValueFilters.push({
                    partitionKey : partitionKey,
                    type : $stateParams['type' + index],
                    partitionValues : $stateParams['partitionValues' + index],
                    startPartitionValue : $stateParams['startPartitionValue' + index],
                    endPartitionValue : $stateParams['endPartitionValue' + index],
                    latestBeforePartitionValue : $stateParams['latestBeforePartitionValue' + index],
                    latestAfterPartitionValue : $stateParams['latestAfterPartitionValue' + index]
                });
            });
        });

        vm.getAvailability = function()
        {
            var request = createAvailabilityRequest();

            vm.businessObjectDataAvalability = null;
            vm.error = null;

            BusinessObjectDataService.getAvailability(request).then(function(businessObjectDataAvalability)
            {
                vm.businessObjectDataAvalability = businessObjectDataAvalability;
                _(businessObjectDataAvalability.availableStatuses).each(function(availableStatus)
                {
                    availableStatus.partitionValues = [].concat(availableStatus.partitionValue).concat(availableStatus.subPartitionValues);

                    availableStatus.businessObjectDataKey = {
                        namespace : businessObjectDataAvalability.namespace,
                        businessObjectDefinitionName : businessObjectDataAvalability.businessObjectDefinitionName,
                        businessObjectFormatUsage : businessObjectDataAvalability.businessObjectFormatUsage,
                        businessObjectFormatFileType : businessObjectDataAvalability.businessObjectFormatFileType,
                        businessObjectFormatVersion : businessObjectDataAvalability.businessObjectFormatVersion,
                        partitionValue : availableStatus.partitionValue,
                        subPartitionValues : availableStatus.subPartitionValues,
                        businessObjectDataVersion : availableStatus.businessObjectDataVersion
                    };
                });

                $state.go(routeName, {
                    form : angular.toJson(vm.form)
                }, {
                    notify : false
                });
            }, function(response)
            {
                vm.errorAvailability = response.data.message;
            });
        };

        vm.generateDdl = function()
        {
            var request = createAvailabilityRequest();
            request.outputFormat = vm.form.outputFormat;
            request.tableName = vm.form.tableName;
            request.customDdlName = vm.form.customDdlName;
            request.includeDropTableStatement = vm.form.includeDropTableStatement;
            request.includeIfNotExistsOption = vm.form.includeIfNotExistsOption;
            request.includeDropPartitions = vm.form.includeDropPartitions;
            request.allowMissingData = true;

            BusinessObjectDataService.generateDdl(request).then(function(businessObjectDataDdl)
            {
                vm.businessObjectDataDdl = businessObjectDataDdl;

                $state.go(routeName, {
                    form : angular.toJson(vm.form)
                }, {
                    notify : false
                });
            }, function(response)
            {
                vm.errorDdl = response.data.message;
            });
        };

        function createAvailabilityRequest()
        {
            var request = {
                namespace : vm.form.namespace,
                businessObjectDefinitionName : vm.form.businessObjectDefinitionName,
                businessObjectFormatUsage : vm.form.businessObjectFormatUsage,
                businessObjectFormatFileType : vm.form.businessObjectFormatFileType,
                businessObjectFormatVersion : vm.form.businessObjectFormatVersion,
                storageNames : FormService.toArray(vm.form.storageNames),
                includeAllRegisteredSubPartitions : vm.form.includeAllRegisteredSubPartitions,
                partitionValueFilters : []
            };

            _(vm.form.partitionValueFilters).each(function(partitionValueFilter)
            {
                if (partitionValueFilter.useFilter)
                {
                    var requestPartitionValueFilters = {
                        partitionKey : partitionValueFilter.partitionKey
                    };
                    if (partitionValueFilter.type === 'values')
                    {
                        requestPartitionValueFilters.partitionValues = FormService.toArray(partitionValueFilter.partitionValues);
                    }
                    else if (partitionValueFilter.type === 'range')
                    {
                        requestPartitionValueFilters.partitionValueRange = {
                            startPartitionValue : partitionValueFilter.startPartitionValue,
                            endPartitionValue : partitionValueFilter.endPartitionValue
                        };
                    }
                    else if (partitionValueFilter.type === 'latestBefore')
                    {
                        requestPartitionValueFilters.latestBeforePartitionValue = {
                            partitionValue : partitionValueFilter.latestBeforePartitionValue
                        };
                    }
                    else if (partitionValueFilter.type === 'latestAfter')
                    {
                        requestPartitionValueFilters.latestAfterPartitionValue = {
                            partitionValue : partitionValueFilter.latestAfterPartitionValue
                        };
                    }
                    request.partitionValueFilters.push(requestPartitionValueFilters);
                }
            });

            return request;
        }

        if (vm.form.partitionValueFilters.length > 0)
        {
            vm.getAvailability();
        }

        if (vm.form.outputFormat)
        {
            vm.generateDdl();
        }
    });
};