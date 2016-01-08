import { Base } from 'yeoman-generator';
import slug from 'slug';

require('core-js');
require('es6-promise').polyfill();
require('isomorphic-fetch');

function getPackageVersions(prop, packages) {
    const done = this.async();

    return Promise.all(packages.map(pkg => {
            return new Promise(function (resolve) {
                if (Array.isArray(pkg)) {
                    const [name, version] = pkg.slice(0, 2);

                    return resolve([name, `^${version}`]);
                }

                fetch(`//registry.npmjs.org/${pkg}/latest`)
                    .then(res => res.json())
                    .then(ref => resolve([pkg, `^${ref.version}`]))
                    .catch(() => resolve([pkg, '*']));
            });
        }))
        .then(deps => {
            this.props[prop] = deps.reduce((memo, curr) => {
                const [pkg, version] = curr.slice(0, 2);

                if (pkg && version) {
                    memo[pkg] = version;
                }

                return memo;
            }, {});

            done();
        })
        .catch(() => {
            this.log('Something went wrong trying to install required modules. Try manually running `npm install` again.');
        });
}

function copy(src, dest, tpl = true) {
    if (tpl) {
        this.fs.copyTpl(this.templatePath(src), this.destinationPath(dest), this.props);
    } else {
        this.fs.copy(this.templatePath(src), this.destinationPath(dest));
    }
}

class AdminAppGenerator extends Base {
    constructor(...args) {
        super(...args);

        this.copy               = copy.bind(this);
        this.getPackageVersions = getPackageVersions.bind(this);

        this.config.save();
    }

    prompting() {
        let done = this.async();

        let prompt = [
            {
                type:    'input',
                name:    'appName',
                message: 'What\'s the name of your application?',
            }, {
                type:      'input',
                name:      'port',
                message:   'Dev server port',
                'default': 3000
            }, {
                type:      'list',
                name:      'install',
                message:   'Install dependencies?',
                choices:   [{name: 'Yes', value: true}, {name: 'No', value: false}],
                'default': true
            }
        ];

        this.prompt(prompt, (props = {}) => {
            this.props = {
                ...props,
                appNameSlug: slug(props.appName).toLowerCase()
            };

            done();
        });
    }

    get configuring() {
        return {
            deps() {
                this.getPackageVersions('deps', [
                    "classnames",
                    "es6-promise",
                    "history",
                    "immutable",
                    "lodash",
                    "material-design-icons",
                    "normalize.css",
                    "react",
                    "react-addons-perf",
                    "react-dom",
                    "react-redux",
                    "react-router",
                    "react-tap-event-plugin",
                    "redux",
                    "redux-actions",
                    "redux-devtools",
                    "redux-logger",
                    "redux-router",
                    "redux-thunk",
                    "whatwg-fetch"
                ]);
            },

            devDeps() {
                this.getPackageVersions('devDeps', [
                    "autoprefixer-loader",
                    "babel-loader",
                    "babel-plugin-react-transform",
                    "babel-polyfill",
                    "babel-preset-es2015",
                    "babel-preset-react",
                    "babel-preset-stage-0",
                    "css-loader",
                    "extract-text-webpack-plugin",
                    "file-loader",
                    "gulp",
                    "gulp-clean",
                    "gulp-notify",
                    "gulp-replace",
                    "gulp-sequence",
                    "gulp-util",
                    "less",
                    "less-loader",
                    "react-transform-catch-errors",
                    "react-transform-hmr",
                    "redbox-react",
                    "redux-devtools",
                    "redux-devtools-dock-monitor",
                    "redux-devtools-log-monitor",
                    "style-loader",
                    "svgo-loader",
                    "url-loader",
                    "webpack",
                    "webpack-dev-server"
                ]);
            }
        }
    }

    writing() {
        this.copy('_package.json', 'package.json');
        this.copy('_gitignore', '.gitignore');
        this.copy('_gulpfile.babel.js', 'gulpfile.babel.js');
        this.copy('_babelrc', '.babelrc');
        this.copy('_webpack.development.js', 'webpack.development.js');
        this.copy('favicon.ico', 'favicon.ico', false);
        this.copy('README.md', 'README.md');
        this.copy('index.html', 'src/index.html');

        this.directory('js', 'src/js');
        this.directory('styles', 'src/styles');
    }

    install() {
        if (this.props.install) {
            this.installDependencies({bower: false});
        }
    }
}

module.exports = AdminAppGenerator;