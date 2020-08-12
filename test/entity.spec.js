const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const ENTITIES_MAIN_DIR = 'entities/';
const EMPLOYEE_ENTITIES_MAIN_DIR = `lib/${ENTITIES_MAIN_DIR}employee/`;
const JOB_ENTITIES_MAIN_DIR = `lib/${ENTITIES_MAIN_DIR}job/`;

const expectedFiles = {
    employeeBloc: [
        `${EMPLOYEE_ENTITIES_MAIN_DIR}/bloc/employee_bloc.dart`,
        `${EMPLOYEE_ENTITIES_MAIN_DIR}/bloc/employee_events.dart`,
        `${EMPLOYEE_ENTITIES_MAIN_DIR}/bloc/employee_state.dart`,
        `${EMPLOYEE_ENTITIES_MAIN_DIR}/bloc/employee_form_model.dart`
    ],
    employeeMain: [
        `${EMPLOYEE_ENTITIES_MAIN_DIR}/employee_list_screen.dart`,
        `${EMPLOYEE_ENTITIES_MAIN_DIR}/employee_update_screen.dart`,
        `${EMPLOYEE_ENTITIES_MAIN_DIR}/employee_view_screen.dart`,
        `${EMPLOYEE_ENTITIES_MAIN_DIR}/employee_model.dart`,
        `${EMPLOYEE_ENTITIES_MAIN_DIR}/employee_repository.dart`
    ],
    jobBloc: [
        `${JOB_ENTITIES_MAIN_DIR}/bloc/job_bloc.dart`,
        `${JOB_ENTITIES_MAIN_DIR}/bloc/job_events.dart`,
        `${JOB_ENTITIES_MAIN_DIR}/bloc/job_form_model.dart`,
        `${JOB_ENTITIES_MAIN_DIR}/bloc/job_state.dart`
    ],
    jobMain: [
        `${JOB_ENTITIES_MAIN_DIR}/job_list_screen.dart`,
        `${JOB_ENTITIES_MAIN_DIR}/job_update_screen.dart`,
        `${JOB_ENTITIES_MAIN_DIR}/job_view_screen.dart`,
        `${JOB_ENTITIES_MAIN_DIR}/job_model.dart`,
        `${JOB_ENTITIES_MAIN_DIR}/job_repository.dart`
    ]
};

describe('Flutter JHipster entity module', () => {
    describe('Employee entity generation with I18n', () => {
        before((done) => {
            helpers
                .run(path.join(__dirname, '../generators/entity/index.js'))
                .withArguments(['Employee', path.join(__dirname, '../test/templates/entity-i18n')])
                .withOptions({ fromCLI: true })
                .on('end', done);
        });

        it('creates expected files entity files', () => {
            assert.file(expectedFiles.employeeBloc);
            assert.file(expectedFiles.employeeMain);
        });

        it('contains the specific code for localization', () => {
            assert.fileContent(`${EMPLOYEE_ENTITIES_MAIN_DIR}employee_list_screen.dart`, 'import \'package:employeeMobile/generated/l10n.dart\';');
            assert.fileContent(`${EMPLOYEE_ENTITIES_MAIN_DIR}employee_list_screen.dart`, 'S.of(context).pageEntitiesEmployeeListTitle');
        });
    });

    describe('Job entity generation without I18n', () => {
        before((done) => {
            helpers
                .run(path.join(__dirname, '../generators/entity/index.js'))
                .withArguments(['Job', path.join(__dirname, '../test/templates/entity')])
                .withOptions({ fromCLI: true })
                .on('end', done);
        });

        it('creates expected files entity files', () => {
            assert.file(expectedFiles.jobBloc);
            assert.file(expectedFiles.jobMain);
        });

        it('NOT containing the specific code for localization', () => {
            assert.noFileContent(`${JOB_ENTITIES_MAIN_DIR}job_list_screen.dart`, 'import \'package:employeeMobile/generated/l10n.dart\';');
            assert.noFileContent(`${JOB_ENTITIES_MAIN_DIR}job_list_screen.dart`, 'S.of(context).pageEntitiesEmployeeListTitle');
        });
    });
});
