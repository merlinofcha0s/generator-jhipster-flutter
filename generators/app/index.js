/* eslint-disable consistent-return */
const chalk = require('chalk');
const _ = require('lodash');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const semver = require('semver');
const mkdirp = require('mkdirp');
const flutterConstants = require('../flutter-generator-constants');
const packagejs = require('../../package.json');

const MAIN_SRC_DIR = flutterConstants.MAIN_SRC_DIR;
const MAIN_DIR = flutterConstants.MAIN_DIR;
const FLUTTER_FILES = flutterConstants.FLUTTER_FILES;
const SUPPORTED_LANGUAGES = flutterConstants.LANGUAGES;
const CLIENT_FLUTTER_TEMPLATES_DIR = 'flutter';

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            checkTools() {
                this.log(chalk.blue.bold('Checking the presence of the Flutter SDK...'));
                const flutterOK = this.spawnCommandSync('flutter', ['doctor']);
                if (flutterOK.status === 1) {
                    throw new Error(chalk.red.bold('Flutter CLI Not found, please install it before running this generator (https://flutter.dev/docs/get-started/install)'));
                }
            },
            readConfig() {
                this.jhipsterAppConfig = this.getAllJhipsterConfig();
                if (!this.jhipsterAppConfig) {
                    this.error('Cannot read .yo-rc.json');
                }
            },
            displayLogo() {
                /* eslint-disable no-useless-escape */
                this.log(`${chalk.bold.cyan('      _ _    _ _____ _____   _____ _______ ______ _____    ______ _     _    _ _______ _______ ______ _____   ')}`);
                this.log(`${chalk.bold.cyan('     | | |  | |_   _|  __ \\ / ____|__   __|  ____|  __ \\  |  ____| |   | |  | |__   __|__   __|  ____|  __ \\')}`);
                this.log(`${chalk.bold.cyan('     | | |__| | | | | |__) | (___    | |  | |__  | |__) | | |__  | |   | |  | |  | |     | |  | |__  | |__) |')}`);
                this.log(`${chalk.bold.cyan(' _   | |  __  | | | |  ___/ \\___ \\   | |  |  __| |  _  /  |  __| | |   | |  | |  | |     | |  |  __| |  _  /')}`);
                this.log(`${chalk.bold.cyan('| |__| | |  | |_| |_| |     ____) |  | |  | |____| | \\ \\  | |    | |___| |__| |  | |     | |  | |____| | \\ \\')}`);
                this.log(`${chalk.bold.cyan(' \\____/|_|  |_|_____|_|    |_____/   |_|  |______|_|  \\_\\ |_|    |______\\____/   |_|     |_|  |______|_|  \\_\\')}`);

                this.log(`\nWelcome to JHipster-Flutter ${chalk.bold.yellowBright(`v${packagejs.version}`)} !`);
                /* eslint-enable no-useless-escape */
            },
            checkJhipster() {
                const currentJhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
                const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
                if (!semver.satisfies(currentJhipsterVersion, minimumJhipsterVersion)) {
                    this.warning(
                        `\nYour generated project used an old JHipster version (${currentJhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`
                    );
                }
            }
        };
    }

    prompting() {
        const done = this.async();
        const prompts = [
            {
                type: 'input',
                name: 'baseName',
                message: 'What is your Flutter application name?',
                store: true
            },
            {
                type: 'input',
                name: 'packageName',
                validate: (input) => (/^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input) ? true : 'The package name you have provided is not a valid Java package name.'),
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
                    {
                        value: 'java',
                        name: 'Java'
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
                    {
                        value: 'objc',
                        name: 'Objective C'
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
            {
                type: 'confirm',
                name: 'enableTranslation',
                message: 'Would you like to enable internationalization support?',
                default: true,
                store: true,
            },
            {
                when: (response) => response.enableTranslation === true,
                type: 'list',
                name: 'nativeLanguage',
                message: 'Please choose the native language of the application',
                choices: SUPPORTED_LANGUAGES,
                default: 'en',
                store: true,
            },
            {
                when: (response) => response.enableTranslation === true,
                type: 'checkbox',
                name: 'languages',
                message: 'Please choose additional languages to install',
                choices: (response) => _.filter(SUPPORTED_LANGUAGES, (o) => o.value !== response.nativeLanguage),
                store: true,
            },
        ];

        this.prompt(prompts)
            .then((props) => {
                this.props = props;
                done();
            });
    }

    writing() {
        this.baseName = this.props.baseName;
        this.packageName = this.props.packageName;
        this.snakedBaseName = _.snakeCase(this.props.baseName);
        this.camelizedBaseName = _.camelCase(this.props.baseName);
        this.camelizedUpperFirstBaseName = _.upperFirst(this.camelizedBaseName);
        this.dasherizedBaseName = _.kebabCase(this.props.baseName);
        this.lowercaseBaseName = this.baseName.toLowerCase();
        this.hipster = this.getHipster(this.baseName);
        this.humanizedBaseName = _.startCase(this.props.baseName);
        this.minSdkVersion = flutterConstants.MIN_SDK_VERSION;
        this.targetSdkVersion = flutterConstants.TARGET_SDK_VERSION;
        this.iosLanguage = this.props.ios;
        this.androidLanguage = this.props.android;
        this.enableTranslation = this.props.enableTranslation;
        this.nativeLanguage = this.props.nativeLanguage;
        this.languages = this.props.languages || [];

        mkdirp(MAIN_SRC_DIR);
        this.writeFilesToDisk(FLUTTER_FILES, this, false, `${CLIENT_FLUTTER_TEMPLATES_DIR}`);
        if (this.enableTranslation) {
            this.copy(`${CLIENT_FLUTTER_TEMPLATES_DIR}/${MAIN_SRC_DIR}l10n/intl_${this.nativeLanguage}.arb.ejs`, `${MAIN_SRC_DIR}l10n/intl_${this.nativeLanguage}.arb`);
            this.languages.forEach((language) => {
                this.copy(`${CLIENT_FLUTTER_TEMPLATES_DIR}/${MAIN_SRC_DIR}l10n/intl_${language}.arb.ejs`, `${MAIN_SRC_DIR}l10n/intl_${language}.arb`);
            });
        }
    }

    install() {
        // Install Android And IOS Dependencies
        this.log(chalk.green('Adding Android and iOS dependencies...'));
        this.spawnCommandSync('flutter', ['create', '--org', `${this.packageName}`,
            '--project-name', `${this.snakedBaseName}`, '--ios-language', `${this.iosLanguage}`, '--android-language', `${this.androidLanguage}`, MAIN_DIR]);

        // Generate Reflection
        this.log(chalk.green('Generate reflection for the first time...'));
        this.spawnCommandSync('flutter', ['pub', 'run', 'build_runner', 'build'], { cwd: MAIN_DIR });

        // Generate Translation
        if (this.enableTranslation) {
            this.log(chalk.green('Activating I18n...'));
            this.spawnCommandSync('flutter', ['pub', 'global', 'activate', 'intl_utils', '1.8.0'], { cwd: MAIN_DIR });
            this.log(chalk.green('Generate I18n files...'));
            this.spawnCommandSync('flutter', ['pub', 'global', 'run', 'intl_utils:generate'], { cwd: MAIN_DIR });
        }
    }

    end() {
        this.log(chalk.green.bold('Flutter application generated successfully.\n'));
        const logMsg = `Start your favorite IDE for flutter (Visual Studio code, IntelliJ or Android Studio) or \n do ${chalk.yellow.bold('flutter run')}\n`;
        this.log(chalk.green(logMsg));
        if (this.enableTranslation) {
            const logMsgI18n = 'Don\'t forget to install flutter-intl for the i18n';
            const logMsgI18nIntelliJPlugins = 'i18n for IntelliJ : (https://plugins.jetbrains.com/plugin/13666-flutter-intl)';
            const logMsgI18nVsCodePlugins = 'i18n for VS code (https://marketplace.visualstudio.com/items?itemName=localizely.flutter-intl) \n';
            this.log(chalk.blue(logMsgI18n));
            this.log(chalk.blue(logMsgI18nIntelliJPlugins));
            this.log(chalk.blue(logMsgI18nVsCodePlugins));
        }
    }
};
