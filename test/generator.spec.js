const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const flutterConstants = require('../generators/flutter-generator-constants');

const MAIN_SRC_DIR = flutterConstants.MAIN_SRC_DIR;
const ANDROID_SRC_DIR = flutterConstants.ANDROID_SRC_DIR;
const MAIN_DIR = flutterConstants.MAIN_DIR;

const expectedFiles = {
    i18n: [
        `${MAIN_SRC_DIR}l10n/intl_en.arb`,
        `${MAIN_SRC_DIR}l10n/intl_fr.arb`
    ],

    common: [
        `${MAIN_DIR}pubspec.yaml`,
        `${MAIN_DIR}.gitignore`,
        `${MAIN_DIR}build.yaml`,
        `${MAIN_DIR}README.md`
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

describe('Flutter JHipster module', () => {
    describe('Default generation without I18n', () => {
        before((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app/index.js'))
                .withPrompts({
                    baseName: 'sampleDefaultFlutter',
                    packageName: 'com.mycompany.myapp',
                    directoryPath: path.join(__dirname, '../test/templates/flutter-default/'),
                    android: 'kotlin',
                    ios: 'swift',
                    stateManageType: 'bloc',
                    enableTranslation: false
                })
                .on('end', done);
        });

        it('creates expected files from jhipster flutter generator with localization', () => {
            assert.file(expectedFiles.common);
            assert.file(expectedFiles.app);
            assert.file(expectedFiles.android);
            assert.noFile(expectedFiles.i18n);
        });

        it('contains the specific change added by the module with localization', () => {
            assert.fileContent(`${MAIN_DIR}pubspec.yaml`, 'name: sampleDefaultFlutter');
            assert.fileContent(`${MAIN_DIR}pubspec.yaml`, 'description: sampleDefaultFlutter flutter project.');
            assert.fileContent(`${MAIN_DIR}pubspec.yaml`, 'description: sampleDefaultFlutter flutter project.');
            assert.noFileContent(`${MAIN_DIR}pubspec.yaml`, 'flutter_intl');
            assert.noFileContent(`${MAIN_DIR}pubspec.yaml`, 'flutter_localizations');
        });
    });

    describe('Generation with I18n', () => {
        before((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app/index.js'))
                .withPrompts({
                    baseName: 'sampleDefaultFlutter',
                    packageName: 'com.mycompany.myapp',
                    directoryPath: path.join(__dirname, '../test/templates/flutter-default/'),
                    android: 'kotlin',
                    ios: 'swift',
                    stateManageType: 'bloc',
                    enableTranslation: true,
                    nativeLanguage: 'en',
                    languages: ['fr']
                })
                .on('end', done);
        });

        it('creates expected files from jhipster flutter generator', () => {
            assert.file(expectedFiles.common);
            assert.file(expectedFiles.app);
            assert.file(expectedFiles.android);
            assert.file(expectedFiles.i18n);
        });

        it('contains the specific change added by the module', () => {
            assert.fileContent(`${MAIN_DIR}pubspec.yaml`, 'name: sampleDefaultFlutter');
            assert.fileContent(`${MAIN_DIR}pubspec.yaml`, 'description: sampleDefaultFlutter flutter project.');
            assert.fileContent(`${MAIN_DIR}pubspec.yaml`, 'description: sampleDefaultFlutter flutter project.');
            assert.fileContent(`${MAIN_DIR}pubspec.yaml`, 'flutter_intl');
            assert.fileContent(`${MAIN_DIR}pubspec.yaml`, 'flutter_localizations');
        });
    });
});
