module.exports = function(app)
{
    'use strict';

    var _ = require('underscore');

    app.service('FormService', function()
    {
        this.toInt = function(str)
        {
            return str && parseInt(str);
        };

        this.toBoolean = function(str)
        {
            return str === 'true';
        };

        this.toArray = function(str)
        {
            var array = null;
            if (str && typeof str === 'string')
            {
                array = [];
                var tokens = str.split(',');
                _(tokens).each(function(token)
                {
                    token = token.trim();
                    if (token.length > 0)
                    {
                        array.push(token);
                    }
                });
            }
            return array;
        };
    });
};