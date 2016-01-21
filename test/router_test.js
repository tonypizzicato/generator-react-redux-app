import _ from 'lodash';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import {createAppGenerator, createSubGenerator} from './helper';
import path from 'path';

const appName = 'Test App Name';
const port    = 3030;

describe('generator:router', function () {

    const prompts = {
        appName: appName,
        install: false,
        port:    port
    };

    const routeName = 'name';

    var deps = [
        [helpers.createDummyGenerator(), 'react-redux-app:entity']
    ];


    beforeEach(function (done) {
        createAppGenerator(prompts)
            .on('end', () => {
                this.generator = createSubGenerator('router', []).withGenerators(deps);

                // Hack to not clear the directory
                this.generator.inDirSet = true;

                done();
            });
    });

    it('should add new route with default label and icon', function (done) {
        const capitalized = _.capitalize(_.camelCase(routeName));

        this.generator
            .withArguments([routeName])
            .on('end', function () {
                assert.fileContent('config/routes.json', routeName);
                assert.fileContent('config/routes.json', 'help_outline');

                assert.file(`src/js/components/pages/${capitalized}.jsx`);
                assert.fileContent(`src/js/components/pages/${capitalized}.jsx`, 'componentDidMount');

                done();
            });
    });

    it('should add child route', function (done) {
        const routeName   = 'child';
        const capitalized = _.capitalize(_.camelCase(routeName));

        this.generator
            .withArguments([routeName, '/child'])
            .withOptions({parent: 'index'})
            .on('end', function () {
                assert.fileContent('config/routes.json', 'routes');
                assert.fileContent('config/routes.json', 'child');

                assert.file(`src/js/components/pages/Index/${capitalized}.jsx`);

                done();
            });
    });
});