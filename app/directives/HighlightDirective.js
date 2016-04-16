module.exports = function(app)
{
    'use strict';

    var highlight = require('highlight.js');

    app.directive('highlight', function()
    {
        return {
            scope : {
                value : '=',
                language : '@'
            },
            template : '<pre></pre>',
            link : function(scope, element)
            {
                var preElement = element.find('pre');

                update();

                var valueWatch = scope.$watch('value', update);

                element.on('$destroy', function()
                {
                    valueWatch();
                });

                function update()
                {
                    var formatted = null;
                    if (scope.value)
                    {
                        formatted = highlight.highlight(scope.language, scope.value).value;
                    }
                    preElement.html(formatted);
                }
            }
        };
    });
};