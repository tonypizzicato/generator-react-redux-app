import _ from 'lodash';
import assert from 'yeoman-assert';
import { createAppGenerator, createSubGenerator } from './helper';
import path from 'path';

const appName    = 'Test App Name';
const port       = 3030;
const serverPort = 3031;

describe('generator:entity', function () {

    const prompts = {
        appName:       appName,
        install:       false,
        port:          port,
        installServer: true,
        apiServerPort: serverPort
    };

    const name   = 'test-entity';
    const remote = `/api/${name}`;

    beforeEach(function (done) {
        createAppGenerator(prompts)
            .on('end', () => {
                this.generator = createSubGenerator('entity', [name]);

                // Hack to not clear the directory
                this.generator.inDirSet = true;

                done();
            });
    });

    it('should add new actions and reducer file', function (done) {
        const camelCased = _.camelCase(name);
        const snakeCased = _.snakeCase(name).toUpperCase();
        this.generator
            .on('end', function () {
                assert.fileContent(`src/js/actions.js`,
                    `import ${camelCased} from './actions/${camelCased}';\n/** inject:action-import */`);
                assert.fileContent(`src/js/actions.js`, `${camelCased}: ${camelCased},\n/** inject:action */`);

                assert.fileContent(`src/js/reducer.js`,
                    `import ${camelCased}Reducer from './reducers/${camelCased}';\n/** inject:reducer-import */`);
                assert.fileContent(`src/js/reducer.js`,
                    `${camelCased}: ${camelCased}Reducer(state.get('${camelCased}'), action),\n/** inject:reducer */`);

                assert.fileContent(`src/js/reducers/${camelCased}.js`, `${snakeCased}_FETCH`);
                assert.fileContent(`src/js/reducers/${camelCased}.js`, 'isFetching');

                assert.fileContent(`src/js/actions/${camelCased}.js`, `http://localhost:${serverPort}/api/${name}`);

                assert.fileContent(`config/state.json`, `"${camelCased}":`);

                done();
            });
    });

    it('should add new route to server.js', function (done) {
        this.generator
            .on('end', function () {
                assert.fileContent('server/server.js', `apiRouter.get('/${name}', (req, res) => res.json([]));\n/** inject:route */`);

                done();
            });
    });

    it('should not update server.js if not installed', function (done) {

        createAppGenerator(_.extend(prompts, {installServer: false}))
            .on('end', () => {
                this.generator = createSubGenerator('entity', [name, remote]).on('end', function () {
                    assert.noFile('server/server.js');

                    done();
                });

                // Hack to not clear the directory
                this.generator.inDirSet = true;
            });
    });
});