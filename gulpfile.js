var path = require('path');
var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

var publicDir = './web/';
var srcDir = './src/Gitcolab/Bundle/AppBundle/Resources/assets/';
var vendorFiles = [
    'web/vendor/jquery/dist/jquery.js',
    'web/vendor/jquery-ui/ui/jquery-ui.js',
    'web/vendor/bootstrap/dist/js/bootstrap.min.js',
    'web/vendor/tinycon/tinycon.min.js',
    'web/vendor/moment/moment.js',
    'web/vendor/moment-timezone/builds/moment-timezone-with-data.min.js',
    'web/vendor/modernizr/modernizr.js',
    'web/vendor/underscore/underscore.js',
    'web/vendor/blueimp-md5/js/md5.js',
    'web/vendor/backbone/backbone.js',
    'web/bundles/bazingajstranslation/js/translator.js',
    'web/bundles/fosjsrouting/js/router.js',
    'web/js/fos_js_routes.js',
    'web/vendor/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',
    'web/vendor/selectize/dist/js/standalone/selectize.min.js',
    'web/vendor/zeroclipboard/dist/ZeroClipboard.js',
    'web/vendor/bootstrap-switch/dist/js/bootstrap-switch.min.js',
    'web/js/template-js-compile.js',
    'web/bundles/tempojsconfiguration/js/configuration.js',
    'web/js/tempo_configuration.js'
];

gulp.task('default', function() {
    gulp.start('build');

});

gulp.task('scripts', function(){

    gulp.src(vendorFiles)
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(publicDir+'js/'));

    var b = browserify({
        entries: srcDir + 'js/app.js',
        debug: true,
        paths: ['./node_modules', './web/vendor', srcDir +'js']
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(plumber())
        //.pipe(uglify())
        .on('error', gutil.log)
        .pipe(gulp.dest(publicDir+'js/'));

});

gulp.task('styles', function (cb) {
    gulp.src([srcDir + 'styles/style.less'])
        .pipe(plumber())
        .pipe(concat('app.css'))
        .pipe(less({
            paths: ['web']
        }))
        .pipe(gulp.dest(publicDir+'css/'));
});


gulp.task('build', function() {
    gulp.start('scripts');
    gulp.start('styles');
});

gulp.task('watch', ['build'], function() {
    gulp.watch(srcDir + 'styles/**/*.less', ['styles']);
    gulp.watch(srcDir + 'js/**/*.js', ['scripts']);
});

