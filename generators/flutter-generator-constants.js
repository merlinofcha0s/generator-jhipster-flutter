const MIN_SDK_VERSION = '18';
const TARGET_SDK_VERSION = '28';
const MAIN_DIR = 'flutter-app/';
const MAIN_SRC_DIR = `${MAIN_DIR}lib/`;
const ANDROID_SRC_DIR = `${MAIN_DIR}android/`;
const IOS_SRC_DIR = `${MAIN_DIR}ios/`;
const MAIN_TEST_DIR = `${MAIN_DIR}test/`;
const INTELLIJ_CONFIG_DIR = `${MAIN_DIR}.idea/runConfigurations/`;

const LANGUAGES = [
    { name: 'French', dispName: 'Français', value: 'fr' },
    { name: 'English', dispName: 'Anglais', value: 'en' }
];

const FLUTTER_FILES = {
    common: [
        {
            path: MAIN_DIR,
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
                'environment.dart',
                'keys.dart',
                'main_prod.dart',
                'main.dart',
                'routes.dart',
                'themes.dart'
            ]
        }
    ],
    shared: [
        {
            path: MAIN_SRC_DIR,
            templates: [
                'shared/widgets/loading_indicator_widget.dart',
                'shared/widgets/drawer/drawer_widget.dart',
                'shared/widgets/drawer/bloc/drawer_bloc.dart',
                'shared/widgets/drawer/bloc/drawer_events.dart',
                'shared/widgets/drawer/bloc/drawer_state.dart',
                'shared/widgets/loading_indicator_widget.dart',
                'shared/models/jwt_token.dart',
                'shared/models/user_jwt.dart',
                'shared/models/user.dart',
                'shared/models/entity_arguments.dart',
                'shared/repository/http_utils.dart',
                'shared/repository/account_repository.dart',
                'shared/exceptions/app_exception.dart',
            ]
        }
    ],
    main: [
        {
            path: MAIN_SRC_DIR,
            templates: [
                'main/bloc/main_bloc.dart',
                'main/bloc/main_events.dart',
                'main/bloc/main_state.dart',
                'main/main_screen.dart',
            ]
        }
    ],
    account: [
        {
            path: MAIN_SRC_DIR,
            templates: [
                'account/login/bloc/login_bloc.dart',
                'account/login/bloc/login_events.dart',
                'account/login/bloc/login_models.dart',
                'account/login/bloc/login_state.dart',
                'account/login/login_repository.dart',
                'account/login/login_screen.dart',
                'account/register/bloc/register_bloc.dart',
                'account/register/bloc/register_events.dart',
                'account/register/bloc/register_models.dart',
                'account/register/bloc/register_state.dart',
                'account/register/register_screen.dart',
                'account/settings/bloc/settings_bloc.dart',
                'account/settings/bloc/settings_events.dart',
                'account/settings/bloc/settings_models.dart',
                'account/settings/bloc/settings_state.dart',
                'account/settings/settings_screen.dart'
            ]
        }
    ],
    android: [
        {
            path: ANDROID_SRC_DIR,
            templates: [
                'app/build.gradle',
                'app/src/main/AndroidManifest.xml'
            ]
        }
    ],
    test: [
        {
            path: MAIN_TEST_DIR,
            templates: [
                'widget_test.dart'
            ]
        }
    ],
    image: [
        {
            path: MAIN_DIR,
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
    ],
    intellij: [
        {
            path: INTELLIJ_CONFIG_DIR,
            templates: [
                'main_dart_dev.xml',
                'main_dart_prod.xml'
            ]
        }
    ],
};

const constants = {
    MIN_SDK_VERSION,
    TARGET_SDK_VERSION,
    LANGUAGES,
    MAIN_SRC_DIR,
    ANDROID_SRC_DIR,
    IOS_SRC_DIR,
    MAIN_DIR,
    FLUTTER_FILES,
    MAIN_TEST_DIR,
    INTELLIJ_CONFIG_DIR
};

module.exports = constants;
