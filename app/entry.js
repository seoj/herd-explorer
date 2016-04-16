(function()
{
    'use strict';

    var _ = require('underscore');

    require('./styles/style.css');
    require('angular-material/angular-material.css');
    require('highlight.js/styles/arduino-light.css');

    var app = require('angular').module('herd-explorer', [ require('angular-ui-router'), require('angular-material') ]);

    app.run(function($state, $rootScope)
    {
        $rootScope.$state = $state;
    });

    requireAll(require.context('./services/', true, /\.js$/));
    requireAll(require.context('./filters/', true, /\.js$/));
    requireAll(require.context('./directives/', true, /\.js$/));
    requireAll(require.context('./routes/', true, /\.js$/));

    function requireAll(require)
    {
        _(require.keys()).each(function(key)
        {
            require(key)(app);
        });
    }
})();