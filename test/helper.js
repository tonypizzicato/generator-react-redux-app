import _ from 'lodash';
import helpers from 'yeoman-test';
import assertBase from 'yeoman-assert';
import path from 'path';

export function createAppGenerator(prompts) {
    return helpers.run(path.join(__dirname, '../src/app'))
        .withPrompts(prompts);
};

export function createSubGenerator(type, args) {
    return helpers.run(path.join(__dirname, '../src/' + type))
        .withOptions({force: true}) // skip file conflicts
        .withArguments(args);
};