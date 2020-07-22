const _ = require('lodash');


const flutterConstants = require('../flutter-generator-constants');
const MAIN_SRC_DIR = flutterConstants.MAIN_SRC_DIR;
const MAIN_DIR = flutterConstants.MAIN_DIR;
const FLUTTER_FILES = flutterConstants.FLUTTER_FILES;
const SUPPORTED_LANGUAGES = flutterConstants.LANGUAGES;
const CLIENT_FLUTTER_TEMPLATES_DIR = 'flutter';


const flutterFiles = {
    client: [
        {
            path: 'lib/',
            templates: [
                {
                    file: 'entity.model',
                    renameTo: generator => `${generator.context.entityFolderName}/${generator.context.entityFileName}_model.dart`
                },
                {
                    file: 'entity.repository',
                    renameTo: generator => `${generator.context.entityFolderName}/${generator.context.entityFileName}_repository.dart`
                },
                {
                    file: 'bloc/entity.state',
                    renameTo: generator => `${generator.context.entityFolderName}/bloc/${generator.context.entityFileName}_state.dart`
                },
                {
                    file: 'bloc/entity.events',
                    renameTo: generator => `${generator.context.entityFolderName}/bloc/${generator.context.entityFileName}_events.dart`
                },
                {
                    file: 'bloc/entity.bloc',
                    renameTo: generator => `${generator.context.entityFolderName}/bloc/${generator.context.entityFileName}_bloc.dart`
                },
                {
                    file: 'entity.list',
                    renameTo: generator => `${generator.context.entityFolderName}/${generator.context.entityFileName}_list_screen.dart`
                }
            ]
        }
    ]
};

module.exports = {
    flutterFiles
};