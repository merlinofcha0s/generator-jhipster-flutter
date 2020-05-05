/* eslint-disable consistent-return */
const chalk = require('chalk');
const _ = require('lodash');
const ClientGenerator = require('generator-jhipster/generators/client');
const mainPrompts = require('generator-jhipster/generators/client/prompts');
const prompts = require('./prompts');
const writeFiles = require('./files').writeFiles;
const blueprintPackagejs = require('../../package.json');
const constants = require('generator-jhipster/generators/generator-constants');

const MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;

module.exports = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(
                `This is a JHipster blueprint and should be used only like ${chalk.yellow(
                    'jhipster --blueprints flutter'
                )}`
            );
        }

        this.configOptions = jhContext.configOptions || {};
        this.blueprintjs = blueprintPackagejs;
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupClientOptions(this, jhContext);
    }

    get initializing() {
        return super._initializing();
    }

    get prompting() {
        // The prompting phase is being overriden so that we can ask our own questions
        return {
            askForClient: prompts.askForClient,

            setSharedConfigOptions() {
                this.configOptions.clientFramework = this.clientFramework;
                this.configOptions.snakedBaseName = _.snakeCase(this.baseName);
            }
        };
    }

    get configuring() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._configuring();
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        // The writing phase is being overriden so that we can write our own templates as well.
        return {
            writeAdditionalFile() {
                writeFiles.call(this);
            }
        };
    }

    get install() {
        return {
            installAndroidAndIOSDependencies() {
                this.log(chalk.green('Adding android and IOS dependencies...'));
                this.spawnCommandSync('flutter', ['create', '--org', `${this.configOptions.packageName}`, '--project-name', `${this.configOptions.snakedBaseName}`, '.'], {cwd: MAIN_SRC_DIR});            
            },
            generateReflection() {
                this.log(chalk.green('Generate reflection for the first time...'));
                this.spawnCommandSync('flutter', ['pub', 'run', 'build_runner', 'build'], {cwd: MAIN_SRC_DIR});
            }
        };
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }
};
