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
                    renameTo: generator => `${generator.context.entityFolderName}/${generator.context.entityFileName}.dart`
                },
            ]
        }
    ]
};

module.exports = {
    writeFiles,
    flutterFiles
};

function writeFiles() {
    return {
        writeClientFiles() {
            this.writeFilesToDisk(flutterFiles, this, false, CLIENT_FLUTTER_TEMPLATES_DIR);
            //this.addEntityToModule(this.entityInstance, this.entityClass, this.entityAngularName, this.entityFolderName, this.entityFileName, this.enableTranslation);

            // Copy for each
           /* if (this.enableTranslation) {
                const languages = this.languages || this.getAllInstalledLanguages();
                languages.forEach((language) => {
                    // this.copyI18n(language, CLIENT_I18N_TEMPLATES_DIR);
                });
            }*/
        }
    };
}