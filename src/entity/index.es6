import _ from 'lodash';
import { Base } from 'yeoman-generator';

class EntityGenerator extends Base {
    constructor(...args) {
        super(...args);

        const port = this.config.get('apiServerPort');

        this.argument('name', {type: String, required: true});
        this.argument('remotePath', {type: String, default: `http://localhost:${port}/api/${this.name}`});

        this.entityName      = this.name;
        this.entityNameSnake = _.snakeCase(this.name).toUpperCase();
        this.entityNameCamel = _.camelCase(this.name);
    }

    writing() {
        let from, to,
            server,
            actions,
            reducer;

        from = this.templatePath('actions.js');
        to   = this.destinationPath(`src/js/actions/${this.entityNameCamel}.js`);

        /** Generating actions for entity */
        this.fs.copyTpl(from, to, this);

        from = this.templatePath('reducer.js');
        to   = this.destinationPath(`src/js/reducers/${this.entityNameCamel}.js`);

        /** Generating actions for entity */
        this.fs.copyTpl(from, to, this);


        actions = this.fs.read(this.destinationPath('src/js/actions.js'));
        actions = actions.replace('/** inject:action-import */',
            `import ${this.entityNameCamel} from './actions/${this.entityNameCamel}';\n/** inject:action-import */`);
        actions = actions.replace('/** inject:action */',
            `${this.entityNameCamel}: ${this.entityNameCamel},\n/** inject:action */`);

        this.fs.write(this.destinationPath('src/js/actions.js'), actions);


        reducer = this.fs.read(this.destinationPath('src/js/reducer.js'));
        reducer = reducer.replace('/** inject:reducer-import */',
            `import ${this.entityNameCamel}Reducer from './reducers/${this.entityNameCamel}';\n/** inject:reducer-import */`);
        reducer = reducer.replace('/** inject:reducer */',
            `${this.entityNameCamel}: ${this.entityNameCamel}Reducer(state.get('${this.entityNameCamel}'), action),\n/** inject:reducer */`);

        this.fs.write(this.destinationPath('src/js/reducer.js'), reducer);


        /** Updating initial state */
        const jsonPath = this.destinationPath('config/state.json');

        let json = this.fs.readJSON(jsonPath) || {};

        json[this.entityNameCamel] = {
            isFetching: false,
            error:      null,
            items:      []
        }

        this.fs.writeJSON(jsonPath, json);

        if (this.config.get('installServer')) {
            server = this.fs.read(this.destinationPath('server/server.js'));
            server = server.replace('/** inject:route */',
                `apiRouter.get('/${this.name}', (req, res) => res.json([]));\n/** inject:route */`);

            this.fs.write(this.destinationPath('server/server.js'), server);
        }
    }
}

module.exports = EntityGenerator;