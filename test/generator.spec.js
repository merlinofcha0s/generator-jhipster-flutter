const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const flutterConstants = require('../generators/flutter-generator-constants');

const MAIN_SRC_DIR = flutterConstants.MAIN_SRC_DIR;
const ANDROID_SRC_DIR = flutterConstants.ANDROID_SRC_DIR;

const expectedFiles = {
    i18n: [
        `${MAIN_SRC_DIR}l10n/intl_en.arb`,
        `${MAIN_SRC_DIR}l10n/intl_fr.arb`
    ],

    common: [
        'pubspec.yaml',
        '.gitignore',
        'build.yaml',
        'README.md'
    ],

    app: [
        `${MAIN_SRC_DIR}app.dart`,
        `${MAIN_SRC_DIR}environement.dart`,
        `${MAIN_SRC_DIR}keys.dart`,
        `${MAIN_SRC_DIR}main_prod.dart`,
        `${MAIN_SRC_DIR}main.dart`,
        `${MAIN_SRC_DIR}mapper.dart`,
        `${MAIN_SRC_DIR}routes.dart`
    ],

    android: [
        `${ANDROID_SRC_DIR}app/build.gradle`
    ]
};

describe('Flutter JHipster blueprint', () => {
    describe('Default', () => {
        before((done) => {
            helpers
                .run('generator-jhipster/generators/app')
                .withOptions({
                    'from-cli': true,
                    skipInstall: true,
                    blueprints: 'flutter',
                    skipChecks: true
                })
                .withGenerators([
                    [
                        require('../generators/app'), // eslint-disable-line global-require
                        'jhipster-flutter:app',
                        path.join(__dirname, '../generators/app/index.js')
                    ]
                ])
                .withPrompts({
                    baseName: 'sampleDefaultFlutter',
                    packageName: 'com.mycompany.myapp',
                    directoryPath: path.join(__dirname, '../test/templates/flutter-default/'),
                    android: 'kotlin',
                    ios: 'swift',
                    stateManageType: 'bloc',
                })
                .on('end', done);
        });

        it('creates expected files from jhipster flutter generator', () => {
            assert.file(expectedFiles.i18n);
            assert.file(expectedFiles.common);
            assert.file(expectedFiles.app);
            assert.file(expectedFiles.android);
        });

        it('contains the specific change added by the blueprint', () => {
            assert.fileContent('pubspec.yaml', 'name: sampleDefaultFlutter');
            assert.fileContent('pubspec.yaml', 'description: sampleDefaultFlutter flutter project.');
        });
    });
});
