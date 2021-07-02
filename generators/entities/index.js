/* eslint-disable consistent-return */
const chalk = require('chalk');
const _ = require('lodash');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const semver = require('semver');
const shelljs = require('shelljs');
const path = require('path');
const fs = require('fs');
const packagejs = require('../../package.json');

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            initContext() {
                this.context = {};
                this.context.jhipsterConfigDirectory = '.jhipster';
            },
            readConfig() {
                try {
                    this.jhipsterAppConfig = this.getAllJhipsterConfig();
                    if (!this.jhipsterAppConfig.packageName) {
                        this.context.searchAutoBackendFolder = false;
                        this.warning('No JHipster project detected !');
                    } else {
                        this.log(chalk.green(`Detected existing project : ${this.jhipsterAppConfig.packageName}`));
                        this.context.searchAutoBackendFolder = true;
                        this.setupEntityOptions(this, this, this.context);
                    }
                } catch (e) {
                    this.warning('Can\'t detect the JHipster project automatically !\n');
                    this.context.searchAutoBackendFolder = false;
                }
            },
            checkJhipster() {
                if (this.context.searchAutoBackendFolder) {
                    const currentJhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
                    const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
                    if (!semver.satisfies(currentJhipsterVersion, minimumJhipsterVersion)) {
                        this.warning(
                            `\nYour generated project used an old JHipster version (${currentJhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`
                        );
                    }
                }
            },
            checkFlutterDirectory() {
                this.destinationPath(this.contextRoot);
                this.destinationRoot(this.contextRoot);
                const exist = fs.existsSync('pubspec.yaml');
                if (!exist) {
                    this.error(chalk.red.bold('Not a valid flutter project, check that you are in your root flutter project directory'));
                }
            }
        };
    }

    prompting() {
        const done = this.async();
        const context = this.context;
        const autodetection = context.searchAutoBackendFolder;
        const prompts = [
            {
                when: () => autodetection === false,
                type: 'input',
                name: 'backendPath',
                message: 'Enter the path to your JHipster app\'s root directory:',
                default: this.directoryPath,
                store: true,
                validate: (input) => {
                    let fromPath = '';
                    const context = this.context;
                    if (path.isAbsolute(input)) {
                        fromPath = `${input}/${context.jhipsterConfigDirectory}`;
                    } else {
                        fromPath = this.destinationPath(`${input}/${context.jhipsterConfigDirectory}`);
                    }

                    if (shelljs.test('-d', fromPath)) {
                        return true;
                    }
                    return `Not a correct JHipster project folder (.jhipster folder not found in ${input}/)`;
                }
            }
        ];

        this.prompt(prompts)
            .then((props) => {
                this.props = props;

                if (this.context.searchAutoBackendFolder) {
                    this.context.backendPath = this.context.rootDir;
                } else {
                    this.configRootPath = props.backendPath;
                    this.context.backendPath = props.backendPath;
                }

                if (!path.isAbsolute(this.context.backendPath)) {
                    context.backendPath = path.resolve(this.context.backendPath);
                }

                this.destinationPath(this.contextRoot);
                this.destinationRoot(this.contextRoot);
                this.context.rootDir = this.contextRoot;
                this.configRootPath = context.backendPath;

                this.jhipsterAppConfig = this.getAllJhipsterConfig();

                const rawdata = fs.readFileSync(`${this.context.backendPath}/.yo-rc.json`);
                const yoRc = JSON.parse(rawdata);
                this.context.baseName = yoRc['generator-jhipster'].baseName;
                this.context.camelizedBaseName = _.camelCase(this.context.baseName);
                this.context.packageName = yoRc['generator-jhipster'].packageName;
                this.context.enableTranslation = yoRc['generator-jhipster'].enableTranslation;

                if (this.context.backendPath) {
                    this.log(chalk.green('\nFound the entity folder configuration file, entity can be automatically generated!\n'));

                    context.fromPath = `${context.backendPath}/${context.jhipsterConfigDirectory}/`;
                    context.useConfigurationFile = true;
                    context.useBackendJson = true;
                    context.fromPath = `${context.backendPath}/${context.jhipsterConfigDirectory}/`;

                    this.context.entitiesToGenerate = [];
                    fs.readdirSync(context.fromPath).forEach((file) => {
                        if (file) {
                            this.context.entitiesToGenerate.push(file.split('.json')[0]);
                        }
                    });
                }
                done();
            });
    }

    writing() {
        this.context.entitiesToGenerate.forEach((entity) => {
            this.log(chalk.green(`Generate ${entity}...`));
            this.spawnCommandSync('yo', ['jhipster-flutter-merlin:entity', entity, this.context.backendPath, '--fromCLI', '--force']);
        });
    }

    install() {
        // Generate Reflection
        this.log(chalk.green('Generate reflection for the new entities...'));
        this.spawnCommandSync('flutter', ['pub', 'run', 'build_runner', 'build', '--delete-conflicting-outputs']);

        // Generate Translation
        if (this.context.enableTranslation) {
            this.log(chalk.green('Generate I18n code for the new entities...'));
            this.spawnCommandSync('flutter', ['pub', 'global', 'run', 'intl_utils:generate']);
        }
    }

    end() {
        this.log(chalk.green.bold('Entities generation done !!\n'));
    }
};
