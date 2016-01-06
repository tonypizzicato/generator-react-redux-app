require('es6-promise').polyfill();

var moment       = require('moment');
var gulp         = require('gulp');
var seq          = require('gulp-sequence');
var concat       = require('gulp-concat');
var clean        = require('gulp-clean');
var cssmin       = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var less         = require('gulp-less');
var uglify       = require('gulp-uglify');
var htmlmin      = require('gulp-htmlmin');
var replace      = require('gulp-replace');
var util         = require('gulp-util');
var buffer       = require('vinyl-buffer');
var source       = require('vinyl-source-stream');
var watchify     = require('watchify');
var envify       = require("envify");

var path = {
    HTML:         'src/*.html',
    JS_BOOTSTRAP: 'src/js/bootstrap.js',
    OUT:          'js/bundle.js',
    STYLES:       'src/styles/*.*ss',
    TMP:          '.tmp',
    TMP_STYLES:   '.tmp/styles/',
    DIST:         'dist',
    DIST_STYLES:  'dist/styles/'
};

/** DEVELOPMENT **/

gulp.task('clean', function (cb) {
    return gulp.src(path.TMP, {read: false})
        .pipe(clean(cb));
});

gulp.task('copy', function () {
    gulp.src(path.HTML)
        .pipe(replace('src="/', 'src="'))
        .pipe(replace('href="/', 'href="'))
        .pipe(gulp.dest(path.TMP));
});

gulp.task('browserify', function () {
    var bundler = browserify({
        entries:      [path.JS_BOOTSTRAP],
        transform:    [[babelify.configure({optional: ["es7.classProperties"]})], ['envify', {NODE_ENV: 'development'}]],
        debug:        true,
        cache:        {},
        packageCache: {},
        standalone:   'Bali'
    });

    var watcher = watchify(bundler);

    watcher.on('time', function (time) {
        util.log(util.colors.green('Browserify'), util.colors.blue('in ' + time / 1000 + 's'));
    });

    return watcher
        .on('update', function () {
            watcher.bundle()
                .on('error', function (error) {
                    console.log(error.message);
                })
                .pipe(source(path.OUT))
                .pipe(gulp.dest(path.TMP));
            util.log(util.colors.green('Browserify'), util.colors.yellow('updating'));
        })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.TMP));
});

gulp.task('css', function () {
    gulp.src([path.STYLES])
        .pipe(less())
        .pipe(concat('bali.css'))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade:  false
        }))
        .pipe(gulp.dest(path.TMP_STYLES));
});


gulp.task('watch', function () {
    gulp.watch(path.STYLES, ['css']);
});


/** PRODUCTION **/

gulp.task('clean:dist', function () {
    return gulp.src(path.DIST, {read: false})
        .pipe(clean());
});

gulp.task('css:dist', function () {
    return gulp.src([path.STYLES])
        .pipe(concat('bali.css'))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade:  false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest(path.DIST_STYLES));
});

gulp.task('html:dist', function () {
    return gulp.src(path.HTML)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(replace('src="/', 'src="'))
        .pipe(replace('href="/', 'href="'))
        .pipe(gulp.dest(path.DIST))
});

gulp.task('js:dist', function () {
    return browserify({
        entries:    [path.JS_BOOTSTRAP],
        transform:  [[babelify, {optional: ["es7.classProperties"]}], ['envify', {'global': true, '_': 'purge', NODE_ENV: 'production'}]],
        debug:      false,
        standalone: 'Bali'
    })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(path.DIST));
});

gulp.task('default', seq('clean', ['copy', 'copy:js', 'browserify', 'css'], 'watch'));

gulp.task('dist', seq('clean:dist', ['html:dist', 'copy:js:dist', 'css:dist', 'js:dist']));
