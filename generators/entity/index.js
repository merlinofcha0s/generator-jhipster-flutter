/* eslint-disable consistent-return */
const chalk = require('chalk');
const _ = require('lodash');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const semver = require('semver');
const mkdirp = require('mkdirp');
const flutterConstants = require('../flutter-generator-constants');
const files = require('./files');
const packagejs = require('../../package.json');
const shelljs = require('shelljs');
const path = require('path');
const fs = require('fs');
const pluralize = require('pluralize');

const CLIENT_FLUTTER_TEMPLATES_DIR = 'flutter';

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            initContext() {
                this.context = {};
                this.context.jhipsterConfigDirectory = '.jhipster';
                this.setupEntityOptions(this, this, this.context);
            },
            readConfig() {
                try{
                    this.jhipsterAppConfig = this.getAllJhipsterConfig();
                    if (!this.jhipsterAppConfig.packageName) {
                        this.context.searchAutoBackendFolder = false;
                        this.warning('No JHipster project detected !');
                    } else {
                        this.log(chalk.green(`Detected existing project : ${this.jhipsterAppConfig.packageName}`));
                        this.context.searchAutoBackendFolder = true;
                    }
                } catch(e) {
                    this.warning('No correct .yo-rc.json detected for automatic generation\n');
                    this.context.searchAutoBackendFolder = false;
                   /* this.context.backendFolder = '.jhipster';
                    let rawdata = fs.readFileSync('.yo-rc.json');
                    let rc = JSON.parse(rawdata);
                    this.log(chalk.green(`${rc['generator-jhipster-flutter-merlin']['promptValues']['backendPath']}`));*/
                }
                
            },
            checkJhipster() {
                if(this.context.searchAutoBackendFolder){
                    const currentJhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
                    const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
                    if (!semver.satisfies(currentJhipsterVersion, minimumJhipsterVersion)) {
                        this.warning(
                            `\nYour generated project used an old JHipster version (${currentJhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`
                        );
                    }
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
                type: 'confirm',
                name: 'useBackendJson',
                message: 'Do you want to generate entities from an existing app?',
                default: true
            },
            {
                when: response => response.useBackendJson === true,
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
                this.configRootPath = props.backendPath;
                this.jhipsterAppConfig = this.getAllJhipsterConfig();
                this.log(chalk.green(`Detected existing project : ${this.jhipsterAppConfig.packageName}`));
                if (props.backendPath) {
                    this.log(chalk.green(`\nFound the entities folder configuration file, entities can be automatically generated!\n`));
                    if (path.isAbsolute(props.backendPath)) {
                        context.backendPath = props.backendPath;
                    } else {
                        context.backendPath = path.resolve(props.backendPath);
                    }

                    context.fromPath = `${context.backendPath}/${context.jhipsterConfigDirectory}/`;
                    context.useConfigurationFile = true;
                    context.useBackendJson = true;
                    
                    this.context.name = 'Employee';
                    context.fromPath = `${context.backendPath}/${context.jhipsterConfigDirectory}/${context.name}.json`;
                    this.context.prodDatabaseType = this.jhipsterAppConfig.prodDatabaseType;
                    this.context.jhiPrefix = this.jhipsterAppConfig.jhiPrefix;
                    this.context.fieldNamesUnderscored = [];
                    this.context.fieldNameChoices = [];
                    this.context.relNameChoices = [];
                    this.loadEntityJson();
                    //this.setupEntityOptions(this, this.context);

                   /* fs.readdirSync(context.fromPath).forEach(file => {
                        context.fromPath = `${context.backendPath}/${context.jhipsterConfigDirectory}/`;
                        this.loadEntityJson();
                      });*/
        
                    // this.loadEntityJson() has a gateway check, which won't work here, so simplify
                    /*if (context.useMicroserviceJson) {
                       context.microserviceName = context.fileData.microserviceName;
                        if (!context.microserviceName) {
                            this.error(chalk.red('Microservice name for the entity is not found. Entity cannot be generated!'));
                        }
                        context.microserviceAppName = this.getMicroserviceAppName(context.microserviceName);
                        context.skipServer = true;
                    }*/
                }
                done();
            });
    }

    loadInMemoryData() {
        const context = this.context;
        const entityName = context.name;
        const entityNamePluralizedAndSpinalCased = _.kebabCase(pluralize(entityName));

        context.entityClass = entityName;
        context.entityClassPlural = pluralize(context.entityClass);

        const fileData = this.data || this.context.fileData;
        // Used for i18n
        context.entityClassHumanized = fileData.entityClassHumanized || _.startCase(context.entityNameCapitalized);
        context.entityClassPluralHumanized = fileData.entityClassPluralHumanized || _.startCase(context.entityClassPlural);
        // Implement i18n variant ex: 'male', 'female' when applied
        context.entityI18nVariant = fileData.entityI18nVariant || 'default';

        context.entityInstance = _.lowerFirst(entityName);
        context.entityInstancePlural = pluralize(context.entityInstance);
        context.entityApiUrl = entityNamePluralizedAndSpinalCased;
        context.entityFileName = _.snakeCase(_.lowerCase(entityName)) + '_model';
        context.entityFolderName = 'entities/' + _.kebabCase(_.lowerCase(entityName));
       
        context.entityModelFileName = context.entityFolderName;
        context.entityParentPathAddition = this.getEntityParentPathAddition(context.clientRootFolder);
        context.entityPluralFileName = entityNamePluralizedAndSpinalCased + context.entityAngularJSSuffix;
        context.entityServiceFileName = context.entityFileName;
        context.entityAngularName = context.entityClass + this.upperFirstCamelCase(context.entityAngularJSSuffix);
        context.entityReactName = context.entityClass + this.upperFirstCamelCase(context.entityAngularJSSuffix);
        context.entityStateName = _.kebabCase(context.entityAngularName);
        context.entityUrl = context.entityStateName;
        context.entityTranslationKey = context.clientRootFolder
            ? _.camelCase(`${context.clientRootFolder}-${context.entityInstance}`)
            : context.entityInstance;
        context.entityTranslationKeyMenu = _.camelCase(
            context.clientRootFolder ? `${context.clientRootFolder}-${context.entityStateName}` : context.entityStateName
        );
        context.jhiTablePrefix = this.getTableName(context.jhiPrefix);
        context.reactiveRepositories =
            context.reactive && ['mongodb', 'cassandra', 'couchbase', 'neo4j'].includes(context.databaseType);

        context.fieldsContainDate = false;
        context.fieldsContainInstant = false;
        context.fieldsContainUUID = false;
        context.fieldsContainZonedDateTime = false;
        context.fieldsContainDuration = false;
        context.fieldsContainLocalDate = false;
        context.fieldsContainBigDecimal = false;
        context.fieldsContainBlob = false;
        context.fieldsContainImageBlob = false;
        context.fieldsContainTextBlob = false;
        context.fieldsContainBlobOrImage = false;
        context.validation = false;
        context.fieldsContainOwnerManyToMany = false;
        context.fieldsContainNoOwnerOneToOne = false;
        context.fieldsContainOwnerOneToOne = false;
        context.fieldsContainOneToMany = false;
        context.fieldsContainManyToOne = false;
        context.fieldsContainEmbedded = false;
        context.fieldsIsReactAvField = false;
        context.blobFields = [];
        context.differentTypes = [context.entityClass];
        if (!context.relationships) {
            context.relationships = [];
        }
        context.differentRelationships = {};
        context.i18nToLoad = [context.entityInstance];
        context.i18nKeyPrefix = `${context.angularAppName}.${context.entityTranslationKey}`;

        // Load in-memory data for fields
        context.fields.forEach(field => {
            const fieldOptions = field.options || {};
            // Migration from JodaTime to Java Time
            if (field.fieldType === 'DateTime' || field.fieldType === 'Date') {
                field.fieldType = 'Instant';
            }
            const fieldType = field.fieldType;

            if (!['Instant', 'ZonedDateTime', 'Boolean'].includes(fieldType)) {
                context.fieldsIsReactAvField = true;
            }

            field.fieldIsEnum = ![
                'String',
                'Integer',
                'Long',
                'Float',
                'Double',
                'BigDecimal',
                'LocalDate',
                'Instant',
                'ZonedDateTime',
                'Duration',
                'UUID',
                'Boolean',
                'byte[]',
                'ByteBuffer',
            ].includes(fieldType);

            if (field.fieldIsEnum === true) {
                context.i18nToLoad.push(field.enumInstance);
            }

            if (_.isUndefined(field.fieldNameCapitalized)) {
                field.fieldNameCapitalized = _.upperFirst(field.fieldName);
            }

            if (_.isUndefined(field.fieldNameUnderscored)) {
                field.fieldNameUnderscored = _.snakeCase(field.fieldName);
            }

            if (_.isUndefined(field.fieldNameAsDatabaseColumn)) {
                const fieldNameUnderscored = _.snakeCase(field.fieldName);
                field.fieldNameAsDatabaseColumn = fieldNameUnderscored;
            }

            if (_.isUndefined(field.fieldNameHumanized)) {
                field.fieldNameHumanized = fieldOptions.fieldNameHumanized || _.startCase(field.fieldName);
            }

            if (_.isUndefined(field.fieldInJavaBeanMethod)) {
                // Handle the specific case when the second letter is capitalized
                // See http://stackoverflow.com/questions/2948083/naming-convention-for-getters-setters-in-java
                if (field.fieldName.length > 1) {
                    const firstLetter = field.fieldName.charAt(0);
                    const secondLetter = field.fieldName.charAt(1);
                    if (firstLetter === firstLetter.toLowerCase() && secondLetter === secondLetter.toUpperCase()) {
                        field.fieldInJavaBeanMethod = firstLetter.toLowerCase() + field.fieldName.slice(1);
                    } else {
                        field.fieldInJavaBeanMethod = _.upperFirst(field.fieldName);
                    }
                } else {
                    field.fieldInJavaBeanMethod = _.upperFirst(field.fieldName);
                }
            }

            if (_.isUndefined(field.fieldValidateRulesPatternJava)) {
                field.fieldValidateRulesPatternJava = field.fieldValidateRulesPattern
                    ? field.fieldValidateRulesPattern.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
                    : field.fieldValidateRulesPattern;
            }

            if (_.isUndefined(field.fieldValidateRulesPatternAngular)) {
                field.fieldValidateRulesPatternAngular = field.fieldValidateRulesPattern
                    ? field.fieldValidateRulesPattern.replace(/"/g, '&#34;')
                    : field.fieldValidateRulesPattern;
            }

            if (_.isUndefined(field.fieldValidateRulesPatternReact)) {
                field.fieldValidateRulesPatternReact = field.fieldValidateRulesPattern
                    ? field.fieldValidateRulesPattern.replace(/'/g, "\\'")
                    : field.fieldValidateRulesPattern;
            }

            field.fieldValidate = _.isArray(field.fieldValidateRules) && field.fieldValidateRules.length >= 1;

            if (fieldType === 'ZonedDateTime') {
                context.fieldsContainZonedDateTime = true;
                context.fieldsContainDate = true;
            } else if (fieldType === 'Instant') {
                context.fieldsContainInstant = true;
                context.fieldsContainDate = true;
            } else if (fieldType === 'Duration') {
                context.fieldsContainDuration = true;
            } else if (fieldType === 'LocalDate') {
                context.fieldsContainLocalDate = true;
                context.fieldsContainDate = true;
            } else if (fieldType === 'BigDecimal') {
                context.fieldsContainBigDecimal = true;
            } else if (fieldType === 'UUID') {
                context.fieldsContainUUID = true;
            } else if (fieldType === 'byte[]' || fieldType === 'ByteBuffer') {
                context.blobFields.push(field);
                context.fieldsContainBlob = true;
                if (field.fieldTypeBlobContent === 'image') {
                    context.fieldsContainImageBlob = true;
                }
                if (field.fieldTypeBlobContent !== 'text') {
                    context.fieldsContainBlobOrImage = true;
                } else {
                    context.fieldsContainTextBlob = true;
                }
            }

            if (field.fieldValidate) {
                context.validation = true;
            }
        });
        let hasUserField = false;
        // Load in-memory data for relationships
        context.relationships.forEach(relationship => {
            const relationshipOptions = relationship.options || {};
            const otherEntityName = relationship.otherEntityName;
            const otherEntityData = this.getEntityJson(otherEntityName);
            if (otherEntityData) {
                if (otherEntityData.microserviceName && !otherEntityData.clientRootFolder) {
                    otherEntityData.clientRootFolder = otherEntityData.microserviceName;
                }
                if (otherEntityData.embedded) {
                    relationship.otherEntityIsEmbedded = true;
                }
            }
            const jhiTablePrefix = context.jhiTablePrefix;

            relationship.otherEntityPrimaryKeyType =
                relationship.otherEntityName === 'user' && context.authenticationType === 'oauth2'
                    ? 'String'
                    : this.getPkType(context.databaseType);

            // Look for fields at the other other side of the relationship
            if (otherEntityData && otherEntityData.relationships) {
                if (relationship.relationshipType === 'many-to-one' || relationship.relationshipType === 'many-to-many') {
                    otherEntityData.relationships.forEach(otherRelationship => {
                        if (_.upperFirst(otherRelationship.otherEntityName) !== entityName) {
                            return;
                        }
                        // otherEntityRelationshipName can be missing
                        if (!otherRelationship.otherEntityRelationshipName) {
                            this.warning(
                                `Cannot compare relationship reference: otherEntityRelationshipName is missing in .jhipster/${otherEntityName}.json for relationship ${JSON.stringify(
                                    otherRelationship,
                                    null,
                                    4
                                )}`
                            );
                            return;
                        }
                        if (otherRelationship.otherEntityRelationshipName !== relationship.relationshipName) {
                            return;
                        }
                        if (
                            (relationship.relationshipType === 'many-to-one' &&
                                otherRelationship.relationshipType === 'one-to-many') ||
                            (relationship.relationshipType === 'many-to-many' &&
                                otherRelationship.relationshipType === 'many-to-many')
                        ) {
                            relationship.otherEntityRelationshipName =
                                relationship.otherEntityRelationshipName || otherRelationship.relationshipName;
                            relationship.otherEntityRelationshipNamePlural =
                                relationship.otherEntityRelationshipNamePlural || pluralize(otherRelationship.relationshipName);
                            relationship.otherEntityRelationshipNameCapitalized =
                                relationship.otherEntityRelationshipNameCapitalized ||
                                _.upperFirst(otherRelationship.relationshipName);
                            relationship.otherEntityRelationshipNameCapitalizedPlural = relationship.otherEntityRelationshipNameCapitalizedPlural = pluralize(
                                relationship.otherEntityRelationshipNameCapitalized
                            );
                        }
                    });
                }
            }

            if (!_.isUndefined(relationship.otherEntityRelationshipName)) {
                if (_.isUndefined(relationship.otherEntityRelationshipNamePlural)) {
                    relationship.otherEntityRelationshipNamePlural = pluralize(relationship.otherEntityRelationshipName);
                }

                if (_.isUndefined(relationship.otherEntityRelationshipNameCapitalized)) {
                    relationship.otherEntityRelationshipNameCapitalized = _.upperFirst(relationship.otherEntityRelationshipName);
                }

                if (_.isUndefined(relationship.otherEntityRelationshipNameCapitalizedPlural)) {
                    relationship.otherEntityRelationshipNameCapitalizedPlural = pluralize(
                        _.upperFirst(relationship.otherEntityRelationshipName)
                    );
                }
            }

            if (_.isUndefined(relationship.relationshipNameCapitalized)) {
                relationship.relationshipNameCapitalized = _.upperFirst(relationship.relationshipName);
            }

            if (_.isUndefined(relationship.relationshipNameCapitalizedPlural)) {
                if (relationship.relationshipName.length > 1) {
                    relationship.relationshipNameCapitalizedPlural = pluralize(_.upperFirst(relationship.relationshipName));
                } else {
                    relationship.relationshipNameCapitalizedPlural = _.upperFirst(pluralize(relationship.relationshipName));
                }
            }

            if (_.isUndefined(relationship.relationshipNameHumanized)) {
                relationship.relationshipNameHumanized =
                    relationshipOptions.relationshipNameHumanized || _.startCase(relationship.relationshipName);
            }

            if (_.isUndefined(relationship.relationshipNamePlural)) {
                relationship.relationshipNamePlural = pluralize(relationship.relationshipName);
            }

            if (_.isUndefined(relationship.relationshipFieldName)) {
                relationship.relationshipFieldName = _.lowerFirst(relationship.relationshipName);
            }

            if (_.isUndefined(relationship.relationshipFieldNamePlural)) {
                relationship.relationshipFieldNamePlural = pluralize(_.lowerFirst(relationship.relationshipName));
            }

            if (context.dto && context.dto === 'mapstruct') {
                if (
                    otherEntityData &&
                    (!otherEntityData.dto || otherEntityData.dto !== 'mapstruct') &&
                    otherEntityName !== 'user'
                ) {
                    this.warning(
                        chalk.red(
                            `This entity has the DTO option, and it has a relationship with entity "${otherEntityName}" that doesn't have the DTO option. This will result in an error.`
                        )
                    );
                }
            }

            if (otherEntityName === 'user') {
                relationship.otherEntityTableName = `${jhiTablePrefix}_user`;
                hasUserField = true;
            } else {
                relationship.otherEntityTableName = otherEntityData ? otherEntityData.entityTableName : null;
                if (!relationship.otherEntityTableName) {
                    relationship.otherEntityTableName = this.getTableName(otherEntityName);
                }
            }

            if (_.isUndefined(relationship.otherEntityNamePlural)) {
                relationship.otherEntityNamePlural = pluralize(relationship.otherEntityName);
            }

            if (_.isUndefined(relationship.otherEntityNameCapitalized)) {
                relationship.otherEntityNameCapitalized = _.upperFirst(relationship.otherEntityName);
            }

            if (_.isUndefined(relationship.otherEntityAngularName)) {
                if (relationship.otherEntityNameCapitalized !== 'User') {
                    const otherEntityAngularSuffix = otherEntityData ? otherEntityData.angularJSSuffix || '' : '';
                    relationship.otherEntityAngularName =
                        _.upperFirst(relationship.otherEntityName) + this.upperFirstCamelCase(otherEntityAngularSuffix);
                } else {
                    relationship.otherEntityAngularName = 'User';
                }
            }

            if (_.isUndefined(relationship.otherEntityNameCapitalizedPlural)) {
                relationship.otherEntityNameCapitalizedPlural = pluralize(_.upperFirst(relationship.otherEntityName));
            }

            if (_.isUndefined(relationship.otherEntityFieldCapitalized)) {
                relationship.otherEntityFieldCapitalized = _.upperFirst(relationship.otherEntityField);
            }

            if (_.isUndefined(relationship.otherEntityStateName)) {
                relationship.otherEntityStateName = _.kebabCase(relationship.otherEntityAngularName);
            }
            if (_.isUndefined(relationship.otherEntityModuleName)) {
                if (relationship.otherEntityNameCapitalized !== 'User') {
                    relationship.otherEntityModuleName = `${
                        context.angularXAppName + relationship.otherEntityNameCapitalized
                    }Module`;
                    relationship.otherEntityFileName = _.kebabCase(relationship.otherEntityAngularName);
                    if (relationship.otherEntityFolderName === undefined) {
                        relationship.otherEntityFolderName = _.kebabCase(relationship.otherEntityAngularName);
                    }
                    if (
                        context.skipUiGrouping ||
                        otherEntityData === undefined ||
                        otherEntityData.clientRootFolder === '' ||
                        otherEntityData.clientRootFolder === undefined
                    ) {
                        relationship.otherEntityClientRootFolder = '';
                    } else {
                        relationship.otherEntityClientRootFolder = `${otherEntityData.clientRootFolder}/`;
                    }
                    if (otherEntityData !== undefined && otherEntityData.clientRootFolder) {
                        if (context.clientRootFolder === otherEntityData.clientRootFolder) {
                            relationship.otherEntityModulePath = relationship.otherEntityFolderName;
                        } else {
                            relationship.otherEntityModulePath = `${
                                context.entityParentPathAddition ? `${context.entityParentPathAddition}/` : ''
                            }${otherEntityData.clientRootFolder}/${relationship.otherEntityFolderName}`;
                        }
                        relationship.otherEntityModelName = `${otherEntityData.clientRootFolder}/${relationship.otherEntityFileName}`;
                        relationship.otherEntityPath = `${otherEntityData.clientRootFolder}/${relationship.otherEntityFolderName}`;
                    } else {
                        relationship.otherEntityModulePath = `${
                            context.entityParentPathAddition ? `${context.entityParentPathAddition}/` : ''
                        }${relationship.otherEntityFolderName}`;
                        relationship.otherEntityModelName = relationship.otherEntityFileName;
                        relationship.otherEntityPath = relationship.otherEntityFolderName;
                    }
                } else {
                    relationship.otherEntityModuleName = `${context.angularXAppName}SharedModule`;
                    relationship.otherEntityModulePath = 'app/core';
                }
            }
            if (otherEntityData) {
                this.copyFilteringFlag(otherEntityData, relationship, { ...otherEntityData, databaseType: context.databaseType });
            }
            // Load in-memory data for root
            if (relationship.relationshipType === 'many-to-many' && relationship.ownerSide) {
                context.fieldsContainOwnerManyToMany = true;
            } else if (relationship.relationshipType === 'one-to-one' && !relationship.ownerSide) {
                context.fieldsContainNoOwnerOneToOne = true;
            } else if (relationship.relationshipType === 'one-to-one' && relationship.ownerSide) {
                context.fieldsContainOwnerOneToOne = true;
            } else if (relationship.relationshipType === 'one-to-many') {
                context.fieldsContainOneToMany = true;
            } else if (relationship.relationshipType === 'many-to-one') {
                context.fieldsContainManyToOne = true;
            }
            if (relationship.otherEntityIsEmbedded) {
                context.fieldsContainEmbedded = true;
            }

            if (relationship.relationshipValidateRules && relationship.relationshipValidateRules.includes('required')) {
                if (entityName.toLowerCase() === relationship.otherEntityName.toLowerCase()) {
                    this.warning(chalk.red('Required relationships to the same entity are not supported.'));
                } else {
                    relationship.relationshipValidate = relationship.relationshipRequired = context.validation = true;
                }
            }

            const entityType = relationship.otherEntityNameCapitalized;
            if (!context.differentTypes.includes(entityType)) {
                context.differentTypes.push(entityType);
            }
            if (!context.differentRelationships[entityType]) {
                context.differentRelationships[entityType] = [];
            }
            context.differentRelationships[entityType].push(relationship);
        });

        context.saveUserSnapshot =
            context.applicationType === 'microservice' &&
            context.authenticationType === 'oauth2' &&
            hasUserField &&
            context.dto === 'no';

        context.primaryKeyType = this.getPkTypeBasedOnDBAndAssociation(
            context.authenticationType,
            context.databaseType,
            context.relationships
        );
        // Deprecated: kept for compatibility, should be removed in next major release
        context.pkType = context.primaryKeyType;
        context.hasUserField = hasUserField;
    }

    writing() {
        this.log(chalk.green(`Writing.....`));
        this.writeFilesToDisk(files.flutterFiles, this, false, `${CLIENT_FLUTTER_TEMPLATES_DIR}`);
    }

    install() {
        // Generate Reflection
        // this.log(chalk.green('Generate reflection...'));
        // this.spawnCommandSync('flutter', ['pub', 'run', 'build_runner', 'build', '--delete-conflicting-outputs'], { cwd: MAIN_DIR });

        // Generate Translation
        // if (this.enableTranslation) {
        //     this.log(chalk.green('Generate I18n files...'));
        //     this.spawnCommandSync('flutter', ['pub', 'global', 'run', 'intl_utils:generate'], { cwd: MAIN_DIR });
        // }
    }

    end() {
        this.log(chalk.green.bold('Entities generation done !!\n'));
    }
};
