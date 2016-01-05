import { Base } from 'yeoman-generator';

class AdminAppGenerator extends Base {
    constructor(...args) {
        super(...args);

        this.config.save();
    }

    prompting = {
        appName() {

            let done   = this.async();
            let prompt = [
                {
                    type:    'input',
                    name:    'appName',
                    message: 'Enter a name for your app:',
                },
            ];

            this.prompt(prompt, ({ appName }) => {
                this.appName = appName;
                done();
            });
        },
    };

    method1() {
        this.log(`The name is: ${ this.appName }`);
    }
}

module.exports = AdminAppGenerator;