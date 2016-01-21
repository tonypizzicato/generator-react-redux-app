import _ from 'lodash';
import { Base } from 'yeoman-generator';

function randomString(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result  = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

class EntityGenerator extends Base {
    constructor(...args) {
        super(...args);

        const port = this.config.get('apiServerPort');

        this.argument('name', {
            type:     String,
            required: true,
            desc:     'Name of generated entity'
        });
        this.argument('remotePath', {
            type:    String,
            default: `http://localhost:${port}/api/${_.kebabCase(this.name)}`,
            desc:    'Remote api path to fetch entities from'
        });
        this.option('with-no-api', {
            alias: 'n',
            desc:  'Disable generation of backend api handler for fetch requests'
        })

        this.entityName      = this.name;
        this.entityNameSnake = _.snakeCase(this.name).toUpperCase();
        this.entityNameKebab = _.kebabCase(this.name);
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
            `${this.entityNameCamel}: ${this.entityNameCamel}Reducer(state.get('${this.entityNameCamel}'), action)\n\t\t/** inject:reducer */`);

        this.fs.write(this.destinationPath('src/js/reducer.js'), reducer);


        /** Updating initial state */
        let jsonPath = this.destinationPath('config/state.json');

        let json = this.fs.readJSON(jsonPath) || {};

        json[this.entityNameCamel] = {
            isFetching: false,
            error:      null,
            items:      []
        }

        this.fs.writeJSON(jsonPath, json);

        if (this.config.get('installServer') && !this.options['with-no-api']) {
            const entities = _.range(0, 5).map(i => ({id: i, value: randomString(32)}));
            const varName  = _.capitalize(this.entityNameCamel);

            server = this.fs.read(this.destinationPath('server/server.js'));
            server = server.replace('/** inject:route */',
                `/** ${this.name} */
let entities${varName} = require('./entity/${this.entityNameKebab}.json');
apiRouter.get('/${this.entityNameKebab}', (req, res) => res.json(entities${varName}));
apiRouter.put('/${this.entityNameKebab}', (req, res) => {
    const lastId = entities${varName}.length ? entities${varName}[entities${varName}.length - 1]["id"] : -1;
    entities${varName}.push({id: lastId + 1, value: randomString(32)});
    res.json(entities${varName});
});
apiRouter.delete('/${this.entityNameKebab}/:id', (req, res) => {
    entities${varName} = entities${varName}.filter(item => item.id != req.params["id"]);
    res.json(entities${varName});
});

/** inject:route */`);

            this.fs.write(this.destinationPath('server/server.js'), server);

            jsonPath = this.destinationPath(`server/entity/${this.entityNameKebab}.json`);

            /** Generating sample data for entity */
            this.fs.writeJSON(jsonPath, entities);
        }
    }

    end() {
        if (this.config.get('installServer') && !this.options['with-no-api']) {
            this.log();
            this.log('[WARN] Don\'t forget to reboot express server with "npm run server"');
            this.log();
        }
    }
}

module.exports = EntityGenerator;