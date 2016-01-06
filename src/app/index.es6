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

function copy(src, dest) {
    this.fs.copyTpl(this.templatePath(src), this.destinationPath(dest), this.props);
}

class AdminAppGenerator extends Base {
    constructor(...args) {
        super(...args);

        this.copy               = copy.bind(this);
        this.getPackageVersions = getPackageVersions.bind(this);

        this.config.save();
    }

    prompting() {
        let done   = this.async();
        let prompt = [
            {
                type:    'input',
                name:    'appName',
                message: 'What\'s the name of your application?',
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
                    "redux-thunk",
                    "whatwg-fetch"
                ]);
            },

            devDeps() {
                this.getPackageVersions('devDeps', [
                    "babelify",
                    "browserify",
                    "chai",
                    "chai-immutable",
                    "envify",
                    "es6-promise",
                    "gulp",
                    "gulp-autoprefixer",
                    "gulp-clean",
                    "gulp-concat",
                    "gulp-cssmin",
                    "gulp-htmlmin",
                    "gulp-less",
                    "gulp-replace",
                    "gulp-sequence",
                    "gulp-uglify",
                    "gulp-util",
                    "jsdom",
                    "mocha",
                    "moment",
                    "sinon",
                    "vinyl-buffer",
                    "vinyl-source-stream",
                    "watchify",
                ]);
            }
        }
    }

    writing() {
        this.copy('_package.json', 'package.json');
        this.copy('_gitignore', '.gitignore');
        this.copy('_gulpfile.js', 'gulpfile.js');
        this.copy('_babelrc', '.babelrc');
        this.copy('README.md', 'README.md');
        this.copy('index.html', 'index.html');

        this.directory('js', 'js');
        this.directory('styles', 'styles');
    }

    install() {
        if (this.install) {
            this.installDependencies({bower: false});
        }
    }
}

module.exports = AdminAppGenerator;