/* eslint-disable consistent-return */
const chalk = require('chalk');
const _ = require('lodash');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const flutterConstants = require('../flutter-generator-constants');
const packagejs = require('../../package.json');
const semver = require('semver');
const mkdirp = require('mkdirp');

const MAIN_SRC_DIR = flutterConstants.MAIN_SRC_DIR;
const ANDROID_SRC_DIR = flutterConstants.ANDROID_SRC_DIR;
const MAIN_DIR = flutterConstants.MAIN_DIR;
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
                this.log(`${chalk.bold.cyan('     | | |  | |_   _|  __ \ / ____|__   __|  ____|  __ \  |  ____| |   | |  | |__   __|__   __|  ____|  __ \  ')}`);
                this.log(`${chalk.bold.cyan('     | | |__| | | | | |__) | (___    | |  | |__  | |__) | | |__  | |   | |  | |  | |     | |  | |__  | |__) | ')}`);
                this.log(`${chalk.bold.cyan(' _   | |  __  | | | |  ___/ \___ \   | |  |  __| |  _  /  |  __| | |   | |  | |  | |     | |  |  __| |  _  /  ')}`);
                this.log(`${chalk.bold.cyan('| |__| | |  | |_| |_| |     ____) |  | |  | |____| | \ \  | |    | |___| |__| |  | |     | |  | |____| | \ \  ')}`);
                this.log(`${chalk.bold.cyan(' \____/|_|  |_|_____|_|    |_____/   |_|  |______|_|  \_\ |_|    |______\____/   |_|     |_|  |______|_|  \_\ ')}`);
                this.log(`${chalk.bold.cyan('                                                                                                               ')}`);

                this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster-Flutter')} generator!`);
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
    
        this.prompt(prompts).then((props) => {
            this.props = props;
            console.dir(this.props)
            done();
        });
    }

    writing() {
        this.baseName = this.props.baseName;
        this.packageName = this.props.packageName;
        this.snakedBaseName = _.snakeCase(this.props.baseName);
        this.camelizedBaseName = _.camelCase(this.props.baseName);
        this.dasherizedBaseName = _.kebabCase(this.props.baseName);
        this.lowercaseBaseName = this.baseName.toLowerCase();
        this.hipster = this.getHipster(this.baseName);
        this.humanizedBaseName = _.startCase(this.props.baseName);
        this.minSdkVersion = flutterConstants.MIN_SDK_VERSION;
        this.targetSdkVersion = flutterConstants.TARGET_SDK_VERSION;

        mkdirp(MAIN_SRC_DIR);
        this.writeFilesToDisk(flutterFiles, this, false, `${CLIENT_FLUTTER_TEMPLATES_DIR}`);
    }

    install() {
        // Install Android And IOS Dependencies
        this.log(chalk.green('Adding Android and iOS dependencies...'));
        this.spawnCommandSync('flutter', ['create', '--org', `${this.packageName}`, '--project-name', `${this.snakedBaseName}`, MAIN_DIR]);

        // Generate Reflection
        this.log(chalk.green('Generate reflection for the first time...'));
        this.spawnCommandSync('flutter', ['pub', 'run', 'build_runner', 'build'], { cwd: MAIN_DIR });

        // Generate Translation
        this.log(chalk.green('Activating I18n...'));
        this.spawnCommandSync('flutter', ['pub', 'global', 'activate', 'intl_utils', '1.4.0'], { cwd: MAIN_DIR });
        this.log(chalk.green('Generate I18n files...'));
        this.spawnCommandSync('flutter', ['pub', 'global', 'run', 'intl_utils:generate'], { cwd: MAIN_DIR });
    }

    end() {
        this.log(chalk.green.bold('Flutter application generated successfully.\n'));
        const logMsg = `Start your favorite IDE for flutter (Visual Studio code, IntelliJ or Android Studio) or \n do ${chalk.yellow.bold('flutter run')}\n`;
        this.log(chalk.green(logMsg));
        const logMsgI18n = 'Don\'t forget to install flutter-intl for the i18n (https://plugins.jetbrains.com/plugin/13666-flutter-intl) \n';
        this.log(chalk.blue(logMsgI18n));
    }
};


const flutterFiles = {
    common: [
        {
            path : MAIN_DIR,
            templates: [
                '.gitignore',
                'build.yaml',
                'pubspec.yaml',
                'README.md'
            ]
        }
    ],
    flutterApp: [
        {
            path: MAIN_SRC_DIR,
            templates: [
                'app.dart',
                'environement.dart',
                'keys.dart',
                'main_prod.dart',
                'main.dart',
                'mapper.dart',
                'routes.dart'
            ]
        }
    ],
    shared: [
        {
            path: MAIN_SRC_DIR,
            templates: [
                'shared/bloc/bloc_provider.dart',
                'shared/bloc/bloc.dart',
                'shared/widgets/loading_indicator_widget.dart',
                'shared/widgets/drawer/drawer_widget.dart',
                'shared/widgets/drawer/drawer_bloc.dart',
                'shared/widgets/loading_indicator_widget.dart',
                'shared/mixins/validators_mixin.dart',
                'shared/models/jwt_token.dart',
                'shared/models/user_jwt.dart',
                'shared/models/user.dart',
                'shared/repository/http_utils.dart',
            ]
        }
    ],
    main: [
        {
            path: MAIN_SRC_DIR,
            templates: [
                'main/main_bloc.dart',
                'main/main_screen.dart',
            ]
        }
    ],
    account: [
        {
            path: MAIN_SRC_DIR,
            templates: [
                'account/login/login_bloc.dart',
                'account/login/login_repository.dart',
                'account/login/login_screen.dart',
                'account/register/register_bloc.dart',
                'account/register/register_screen.dart',
                'account/register/account_repository.dart',
            ]
        }
    ],
    i18n: [
        {
            path: MAIN_SRC_DIR,
            templates: [
                'l10n/intl_en.arb',
                'l10n/intl_fr.arb'
            ]
        }
    ],
    android: [
        {
            path: ANDROID_SRC_DIR,
            templates: [
                'app/build.gradle',
            ]
        }
    ],
    image: [
        {
            path : MAIN_DIR,
            templates: [
                { file: 'assets/images/jhipster_family_member_0.svg', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_1.svg', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_2.svg', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_3.svg', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_0_head-192.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_1_head-192.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_2_head-192.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_3_head-192.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_0_head-256.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_1_head-256.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_2_head-256.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_3_head-256.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_0_head-384.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_1_head-384.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_2_head-384.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_3_head-384.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_0_head-512.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_1_head-512.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_2_head-512.png', method: 'copy' },
                { file: 'assets/images/jhipster_family_member_3_head-512.png', method: 'copy' },
                { file: 'assets/images/logo-jhipster.png', method: 'copy' }
            ]
        }
    ]
};