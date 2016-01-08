import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import slug from 'slug';

const appName = 'Test App Name';
const port    = 3030;

describe('generator:app', () => {

    before(done => {
        helpers.run(path.join(__dirname, '../src/app'))
            .withPrompts({
                appName: appName,
                install: false,
                port:    port
            })
            .on('end', done);
    });

    it('should generate utility files', () => {
        assert.file([
            ".babelrc",
            ".gitignore",
            ".yo-rc.json",
            "favicon.ico",
            "gulpfile.babel.js",
            "package.json",
            "README.md",
            "webpack.development.js",
            "src"
        ]);
    });

    it('should compile files with placeholders', () => {
        assert.fileContent('package.json', `"name": "${slug(appName).toLowerCase()}"`);
        assert.fileContent('README.md', appName);
        assert.fileContent('gulpfile.babel.js', `const PORT = process.env.PORT || ${port};`);
        assert.fileContent('src/js/components/pages/Main.jsx', `Hello from ${appName}`);
    });
})