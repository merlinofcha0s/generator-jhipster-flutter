const shelljs = require('shelljs');
const chalk = require('chalk');

module.exports = {
    askForFlutterApps
};

function askForFlutterApps(meta) {
    if (!meta && this.existingProject) return;

    const prompts = [
        {
            type: 'input',
            name: 'baseName',
            message: 'What is your Flutter application name?',
            default: this.getDefaultAppName(),
            store: true
        },
        {
            type: 'input',
            name: 'directoryPath',
            message: 'Where JHipster app directory is located?',
            default: '../jh-server',
            store: true,
            validate: (input) => {
                const path = this.destinationPath(input);
                if (shelljs.test('-d', path)) {
                    const appsFolders = getAppFolder.call(this, input);
                    if (appsFolders.length === 0) {
                        return `No application found in ${path}`;
                    }
                    return true;
                }
                return `${path} is not a directory or doesn't exist`;
            }
        },
        {
            type: 'input',
            name: 'packageName',
            validate: input => (/^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input) ? true : 'The package name you have provided is not a valid Java package name.'),
            message: 'What is your package name?',
            default: 'com.myapp',
            store: true
        },
        {
            type: 'list',
            name: 'android',
            message: 'Which Android native code do you want to use?',
            store: true,
            choices: [
                {
                    value: 'kotlin',
                    name: 'Kotlin'
                },
            ],
            default: 'kotlin'
        },
        {
            type: 'list',
            name: 'ios',
            message: 'Which iOS native code do you want to use?',
            store: true,
            choices: [
                {
                    value: 'swift',
                    name: 'Swift'
                },
            ],
            default: 'swift'
        },
        {
            type: 'list',
            name: 'stateManageType',
            message: 'Which State-Management style do you want to use?',
            store: true,
            choices: [
                {
                    value: 'bloc',
                    name: 'BLoC'
                }
            ],
            default: 'bloc'
        },
    ];

    const done = this.async();
    this.prompt(prompts).then((props) => {
        this.props = props;
        done();
    });
}

/**
 * Get App Folders
 * @param input path to join to destination path
 * @returns {Array} array of string representing app folders
 */
function getAppFolder(input) {
    const destinationPath = this.destinationPath(input);
    const appsFolders = [];

    if (shelljs.test('-f', `${destinationPath}/.yo-rc.json`)) {
        try {
            const fileData = this.fs.readJSON(`${destinationPath}/.yo-rc.json`);
            if (fileData['generator-jhipster'].baseName !== undefined) {
                appsFolders.push(destinationPath);
            }
        } catch (err) {
            this.log(chalk.red(`The .yo-rc.json in ${destinationPath} can't be read!`));
            this.debug('Error:', err);
        }
    }

    return appsFolders;
}
