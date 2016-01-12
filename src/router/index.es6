import _ from 'lodash';
import path from 'path';
import { Base } from 'yeoman-generator';
import espree from 'espree';

class RouterGenerator extends Base {
    constructor(...args) {
        super(...args);

        this.argument('routeName', {type: String, required: true});
        this.argument('routePath', {type: String, required: true});
        this.argument('routeLabel', {type: String, default: 'label'});
        this.argument('routeIcon', {type: String, default: 'help_outline'});

        this.option('parent', {type: String, default: null});

        this.pageClassName = _.capitalize(_.camelCase(this.routeName));
        this.pagePathName  = this.pageClassName;
    }

    writing() {
        /** Updating routes */
        const jsonPath = this.destinationPath('config/routes.json');

        let json = this.fs.readJSON(jsonPath) || {};

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
                    "icon":  this.routeIcon
                }
            });

            /** Generating Page component */
            this.fs.copyTpl(this.templatePath('Page.jsx'),
                this.destinationPath(`src/js/components/pages/${this.pageClassName}.jsx`), this);
        } else {
            /** Add sub-route for specified parent */
            json[parentRoute]['routes'] = _.extend(json[parentRoute]['routes'] || {}, {
                [this.routeName]: {
                    "path":  this.routePath,
                    "label": this.routeLabel,
                    "icon":  this.routeIcon
                }
            });


            this.pagePathName = path.join(_.capitalize(_.camelCase(parentRoute)), this.pageClassName);
            /** Generating Page component */
            this.fs.copyTpl(this.templatePath('Page.jsx'),
                this.destinationPath(`src/js/components/pages/${this.pagePathName}.jsx`), this);
        }

        this.fs.writeJSON(jsonPath, json);


        /** Code modification */
        //const code   = this.fs.read(this.destinationPath(`src/js/app-routes.jsx`));
        //const routes = espree.parse(code, {sourceType: 'module', ecmaFeatures: {jsx: true}});
    }
}

module.exports = RouterGenerator;