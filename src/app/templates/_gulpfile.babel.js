import path from 'path';
import gulp from 'gulp';
import seq from 'gulp-sequence';
import clean from 'gulp-clean';
import replace from 'gulp-replace';
import util from 'gulp-util';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.development';
import packageJson from './package.json';

const PORT = process.env.PORT || <%= port %>;

const paths = {
    HTML:        'src/*.html',
    ICO:         'src/favicon.ico',
    JS_MAIN:     'src/js/index.js',
    STYLES:      'src/styles/main.less',
    TMP:         '.tmp',
    TMP_STYLES:  '.tmp/styles/',
    DIST:        'dist',
    DIST_STYLES: 'dist/styles/',
    OUT:         'js/bundle.js'
};


/** DEVELOPMENT **/

gulp.task('set-dev-node-env', function () {
    process.env.NODE_ENV  = 'development';
    process.env.BABEL_ENV = 'development';
});

gulp.task('clean', () => {
    return gulp.src(paths.TMP, {read: false})
        .pipe(clean());
});

gulp.task('copy', () => {
    gulp.src(paths.HTML)
        .pipe(replace('<!-- inject:webpack-dev-server.js -->', `<script src="http://localhost:${PORT}/webpack-dev-server.js"></script>`))
        .pipe(gulp.dest(paths.TMP));

    gulp.src('favicon.ico')
        .pipe(gulp.dest(paths.TMP));
});

gulp.task('watch', () => {
    gulp.watch(paths.HTML, ['copy']);
});

// Start a livereloading development server
gulp.task('webpack', function () {
    const PATH = '.tmp';

    // modify some webpack config options
    const config   = Object.create(webpackConfig(PATH, PORT));

    config.devtool = "eval";
    config.debug   = true;

    new WebpackDevServer(webpack(config), {
        contentBase:  path.join(__dirname, PATH),
        publicPath:   `http://localhost:${PORT}/`,
        historyApiFallback: true,
        hot:          true,
        watchOptions: {
            aggregateTimeout: 100
        },
        stats:        {
            colors: true
        }
    }).listen(PORT, 'localhost', err => {
        if (err) {
            throw new util.PluginError('webpack', err);
        }
        util.log("[webpack-dev-server]", `http://localhost:${PORT}/`);
    });
});

gulp.task('serve', seq('set-dev-node-env', 'clean', ['copy', 'webpack'], 'watch'));

gulp.task('default', ['serve']);
