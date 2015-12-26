'use strict';

exports.config = {
    paths: {
        'public': 'web',
        'watched': ['src/Gitcolab/Bundle/AppBundle/Resources']
    },
    conventions: {
        'assets': /^src\/Gitcolab\/Bundle\/AppBundle\/Resources\/assets/,
        ignored: [
            'bower_components/jquery/',
            'bower_components/modernizr/'
        ]
    },
    files: {
        javascripts: {
            joinTo: {
                'js/app.js': /^app/,
                'js/vendor.js': /^(?!app)/
            }
        },
        stylesheets: {
            joinTo: 'css/app.css'
        }
    },
    plugins: {
        less: {
            dumpLineNumbers: 'comments'
        }
    }
};