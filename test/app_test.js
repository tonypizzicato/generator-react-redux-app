import _ from 'lodash';
import assert from 'yeoman-assert';
import { createAppGenerator, createSubGenerator } from './helper';
import path from 'path';
import slug from 'slug';

const appName = 'Test App Name';
const port    = 3030;

describe('generator:app', () => {

    before(done => {
        createAppGenerator({
            appName: appName,
            install: false,
            port:    port
        }).on('end', done);
    });

    it('every generator can be required without throwing', function () {
        this.app    = require('../generators/app');
        this.router = require('../generators/router');
    });

    it('should generate expected files', () => {
        assert.file([
            ".babelrc",
            ".gitignore",
            ".yo-rc.json",
            "favicon.ico",
            "gulpfile.babel.js",
            "package.json",
            "README.md",
            "webpack.development.js",
            "config/routes.json",
            "src"
        ]);
    });

    it('should compile files with placeholders', () => {
        assert.fileContent('package.json', `"name": "${slug(appName).toLowerCase()}"`);
        assert.fileContent('README.md', appName);
        assert.fileContent('gulpfile.babel.js', `const PORT = process.env.PORT || ${port};`);
        assert.fileContent('src/js/components/pages/Index.jsx', `Hello from ${appName}`);
        assert.fileContent('config/routes.json', 'index');
    });
});