/* eslint-disable consistent-return */
const chalk = require('chalk');
const _ = require('lodash');
const ClientGenerator = require('generator-jhipster/generators/client');
const prompts = require('./prompts');
const writeFiles = require('./files').writeFiles;
const blueprintPackagejs = require('../../package.json');
const constants = require('generator-jhipster/generators/generator-constants');
const flutterConstants = require('../flutter-generator-constants');

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
        const phaseFromJHipster = super._initializing();
        const flutterInitPhase = {
            checkTools() {
                this.log(chalk.blue.bold('Checking the presence of the Flutter SDK...'));
                var flutterOK = this.spawnCommandSync('flutter', ['doctor']);
                if(flutterOK.status === 1) {
                    throw new Error(chalk.red.bold('Flutter CLI Not found, please install it before running this generator (https://flutter.dev/docs/get-started/install)'));
                }
             },
             displayLogo() {
                this.log(`${chalk.bold.cyan('       _ _    _ _____ _____   _____ _______ ______ _____    ______ _     _    _ _______ _______ ______ _____   ')}`);
                this.log(`${chalk.bold.cyan('      | | |  | |_   _|  __ \ / ____|__   __|  ____|  __ \  |  ____| |   | |  | |__   __|__   __|  ____|  __ \  ')}`);
                this.log(`${chalk.bold.cyan('      | | |__| | | | | |__) | (___    | |  | |__  | |__) | | |__  | |   | |  | |  | |     | |  | |__  | |__) | ')}`);
                this.log(`${chalk.bold.cyan('  _   | |  __  | | | |  ___/ \___ \   | |  |  __| |  _  /  |  __| | |   | |  | |  | |     | |  |  __| |  _  /  ')}`);
                this.log(`${chalk.bold.cyan(' | |__| | |  | |_| |_| |     ____) |  | |  | |____| | \ \  | |    | |___| |__| |  | |     | |  | |____| | \ \  ')}`);
                this.log(`${chalk.bold.cyan('  \____/|_|  |_|_____|_|    |_____/   |_|  |______|_|  \_\ |_|    |______\____/   |_|     |_|  |______|_|  \_\ ')}`);
                this.log(`${chalk.bold.cyan('                                                                                                               ')}`);

                this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster-Flutter')} generator!`);
            }
        }

        return Object.assign(phaseFromJHipster, flutterInitPhase);
    }

    get prompting() {
        return {
            askForFlutterApps: prompts.askForFlutterApps
        };
    }

    get configuring() {
        return {
            saveConfig() {
                this.configOptions.baseName = this.props.baseName;
                this.configOptions.packageName = this.props.packageName;
                this.configOptions.directoryPath = this.props.directoryPath;
                this.configOptions.packageFolder = this.props.baseName;
                this.configOptions.android = this.props.android
                this.configOptions.ios = this.props.ios;
                this.configOptions.stateManageType = this.props.stateManageType;

                const fromPath = `${this.props.directoryPath}/.yo-rc.json`;
                this.log(fromPath);
                this.jhipsterAppConfig = this.fs.readJSON(fromPath)['generator-jhipster'];
            },
            configureGlobal() {
                this.baseName = this.configOptions.baseName;
                this.packageName = this.configOptions.packageName;
                this.snakedBaseName = _.snakeCase(this.configOptions.baseName);
                this.camelizedBaseName = _.camelCase(this.configOptions.baseName);
                this.dasherizedBaseName = _.kebabCase(this.configOptions.baseName);
                this.lowercaseBaseName = this.baseName.toLowerCase();
                this.hipster = this.getHipster(this.baseName);
                this.humanizedBaseName = _.startCase(this.configOptions.baseName);
                this.minSdkVersion = flutterConstants.MIN_SDK_VERSION;
                this.targetSdkVersion = flutterConstants.TARGET_SDK_VERSION;
            }
        };
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
                this.log(chalk.green('Adding Android and iOS dependencies...'));
                this.spawnCommandSync('flutter', ['create', '--org', `${this.packageName}`, '--project-name', `${this.snakedBaseName}`, '.']);            
            },
            generateReflection() {
                this.log(chalk.green('Generate reflection for the first time...'));
                this.spawnCommandSync('flutter', ['pub', 'run', 'build_runner', 'build']);
            },
            generateTranslation() {
                this.log(chalk.green('Activating I18n...'));
                this.spawnCommandSync('flutter', ['pub', 'global', 'activate', 'intl_utils', '1.4.0']);
                this.log(chalk.green('Generate I18n files...'));
                this.spawnCommandSync('flutter', ['pub', 'global', 'run', 'intl_utils:generate']);
            }
        };
    }

    get end() {
        return {
            end() {
                this.log(chalk.green.bold('\Flutter application generated successfully.\n'));
                const logMsg = `Start your favorite IDE for flutter (Visual Studio code, IntelliJ or Android Studio) or \n do ${chalk.yellow.bold(`flutter run`)}\n`;
                this.log(chalk.green(logMsg));
                const logMsgI18n = `Don't forget to install flutter-intl for the i18n (https://plugins.jetbrains.com/plugin/13666-flutter-intl) \n`;
                this.log(chalk.blue(logMsgI18n));
            },
        };
    }
};
