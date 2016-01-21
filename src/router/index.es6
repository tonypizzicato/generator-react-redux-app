import _ from 'lodash';
import path from 'path';
import {Base} from 'yeoman-generator';

const routeIcon = 'help_outline';

class RouterGenerator extends Base {
    constructor(...args) {
        super(...args);

        this.argument('routeName', {
            type:     String,
            required: true,
            desc:     'The name of generated route. Used for menu label and route path'
        });

        this.option('parent', {
            alias:   'p',
            type:    String,
            default: null,
            desc:    'The name of parent route, that generated one will be nested in'
        });

        this.option('with-no-entity', {
            alias:   'e',
            type:    Boolean,
            default: false,
            desc:    'Disable generation of entity and api handlers'
        });


        this.routePath  = _.kebabCase(this.routeName);
        this.routeLabel = _.capitalize(this.routeName);

        this.pageClassName = _.capitalize(_.camelCase(this.routeName));
        this.pagePathName  = this.pageClassName;
        this.entityName    = _.camelCase(this.routeName);
    }

    writing() {
        /** Updating routes */
        const jsonPath = this.destinationPath('config/routes.json');

        let json = this.fs.readJSON(jsonPath) || {};

        let pageClassPath;
        const parentRoute = this.options.parent;

        if (parentRoute && !json[parentRoute]) {
            throw Error(`Parent node "${parentRoute}" was not configured!`);
        }

        if (!parentRoute) {
            /** Add top-level route */
            json = _.extend(this.fs.readJSON(jsonPath) || {}, {
                [this.routeName]: {
                    "path":  this.routePath,
                    "label": this.routeLabel,
                    "icon":  routeIcon
                }
            });

            pageClassPath = this.pageClassName;
        } else {
            /** Add sub-route for specified parent */
            json[parentRoute]['routes'] = _.extend(json[parentRoute]['routes'] || {}, {
                [this.routeName]: {
                    "path":  this.routePath,
                    "label": this.routeLabel,
                    "icon":  routeIcon
                }
            });

            this.pagePathName = path.join(_.capitalize(_.camelCase(parentRoute)), this.pageClassName);
            pageClassPath     = this.pagePathName;
        }

        this.fs.writeJSON(jsonPath, json);

        if (!this.options['with-no-entity']) {

            /** Generating Page component */
            this.fs.copyTpl(this.templatePath('PageDispatched.jsx'),
                this.destinationPath(`src/js/components/pages/${pageClassPath}.jsx`), this);

            this.composeWith('react-redux-app:entity', {args: [this.routeLabel]});
        } else {
            /** Generating Page component */
            this.fs.copyTpl(this.templatePath('Page.jsx'),
                this.destinationPath(`src/js/components/pages/${pageClassPath}.jsx`), this);
        }
    }
}

module.exports = RouterGenerator;