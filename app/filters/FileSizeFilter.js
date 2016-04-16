module.exports = function(app)
{
    'use strict';

    app.filter('fileSize', function()
    {
        return function(fileSizeBytes)
        {
            var b = fileSizeBytes;
            var kb = b / 1024;
            var mb = kb / 1024;
            var gb = mb / 1024;

            if (Math.floor(gb) > 0)
            {
                return gb.toFixed(2) + 'GB';
            }
            else if (Math.floor(mb) > 0)
            {
                return mb.toFixed(2) + 'MB';
            }
            else if (Math.floor(kb) > 0)
            {
                return kb.toFixed(2) + 'KB';
            }
            else
            {
                return b + 'B';
            }
        };
    });
};