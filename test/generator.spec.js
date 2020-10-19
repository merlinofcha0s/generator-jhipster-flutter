const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const flutterConstants = require('../generators/flutter-generator-constants');

const MAIN_SRC_DIR = flutterConstants.MAIN_SRC_DIR;
const ANDROID_SRC_DIR = flutterConstants.ANDROID_SRC_DIR;
const IOS_SRC_DIR = flutterConstants.IOS_SRC_DIR;
const MAIN_DIR = flutterConstants.MAIN_DIR;
const INTELLIJ_CONFIG_DIR = flutterConstants.INTELLIJ_CONFIG_DIR;

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
        `${MAIN_SRC_DIR}environment.dart`,
        `${MAIN_SRC_DIR}keys.dart`,
        `${MAIN_SRC_DIR}main_prod.dart`,
        `${MAIN_SRC_DIR}main.dart`,
        `${MAIN_SRC_DIR}routes.dart`
    ],
    account: [
        `${MAIN_SRC_DIR}account/login/bloc/login_bloc.dart`,
        `${MAIN_SRC_DIR}account/login/bloc/login_events.dart`,
        `${MAIN_SRC_DIR}account/login/bloc/login_models.dart`,
        `${MAIN_SRC_DIR}account/login/bloc/login_state.dart`,
        `${MAIN_SRC_DIR}account/login/login_repository.dart`,
        `${MAIN_SRC_DIR}account/login/login_screen.dart`,
        `${MAIN_SRC_DIR}account/register/bloc/register_bloc.dart`,
        `${MAIN_SRC_DIR}account/register/bloc/register_events.dart`,
        `${MAIN_SRC_DIR}account/register/bloc/register_models.dart`,
        `${MAIN_SRC_DIR}account/register/bloc/register_state.dart`,
        `${MAIN_SRC_DIR}account/register/register_screen.dart`,
        `${MAIN_SRC_DIR}account/settings/bloc/settings_bloc.dart`,
        `${MAIN_SRC_DIR}account/settings/bloc/settings_events.dart`,
        `${MAIN_SRC_DIR}account/settings/bloc/settings_models.dart`,
        `${MAIN_SRC_DIR}account/settings/bloc/settings_state.dart`,
        `${MAIN_SRC_DIR}account/settings/settings_screen.dart`
    ],
    android: [
        `${ANDROID_SRC_DIR}app/build.gradle`,
        `${ANDROID_SRC_DIR}app/src/main/AndroidManifest.xml`
    ],
    intellij: [
        `${INTELLIJ_CONFIG_DIR}main_dart_dev.xml`,
        `${INTELLIJ_CONFIG_DIR}main_dart_prod.xml`
    ]
};

describe('Flutter JHipster generator module', () => {
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
            assert.file(expectedFiles.intellij);
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
                    directoryPath: path.join(__dirname, '../test/templates/generator/'),
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
            assert.file(expectedFiles.intellij);
        });

        it('contains kotlin and swift files', () => {
            assert.file([`${ANDROID_SRC_DIR}app/src/main/kotlin/com/mycompany/myapp/sample_default_flutter/MainActivity.kt`]);
            assert.file([`${IOS_SRC_DIR}Runner/AppDelegate.swift`]);
        });

        it('contains the specific change added by the module', () => {
            assert.fileContent(`${MAIN_DIR}pubspec.yaml`, 'name: sampleDefaultFlutter');
            assert.fileContent(`${MAIN_DIR}pubspec.yaml`, 'description: sampleDefaultFlutter flutter project.');
            assert.fileContent(`${MAIN_DIR}pubspec.yaml`, 'description: sampleDefaultFlutter flutter project.');
            assert.fileContent(`${MAIN_DIR}pubspec.yaml`, 'flutter_intl');
            assert.fileContent(`${MAIN_DIR}pubspec.yaml`, 'flutter_localizations');
        });
    });

    describe('Generation with Java and Objective C', () => {
        before((done) => {
            helpers
                .run(path.join(__dirname, '../generators/app/index.js'))
                .withPrompts({
                    baseName: 'sampleDefaultFlutter',
                    packageName: 'com.mycompany.myapp',
                    directoryPath: path.join(__dirname, '../test/templates/flutter-default/'),
                    android: 'java',
                    ios: 'objc',
                    stateManageType: 'bloc',
                    enableTranslation: false,
                })
                .on('end', done);
        });

        it('creates expected files with java and objective C languages', () => {
            assert.file(expectedFiles.common);
            assert.file(expectedFiles.app);
            assert.file(expectedFiles.android);
            assert.file(expectedFiles.intellij);
            assert.noFile(expectedFiles.i18n);

            // Android file
            assert.noFile([`${ANDROID_SRC_DIR}app/src/main/kotlin/com/mycompany/myapp/sample_default_flutter/MainActivity.kt`]);
            assert.file([`${ANDROID_SRC_DIR}app/src/main/java/com/mycompany/myapp/sample_default_flutter/MainActivity.java`]);
            // iOS File
            assert.noFile([`${IOS_SRC_DIR}Runner/AppDelegate.swift`]);
            assert.file([`${IOS_SRC_DIR}Runner/AppDelegate.h`]);
            assert.file([`${IOS_SRC_DIR}Runner/AppDelegate.m`]);
            assert.file([`${IOS_SRC_DIR}Runner/main.m`]);
        });
    });
});
