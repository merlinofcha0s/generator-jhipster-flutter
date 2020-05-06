/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const mkdirp = require('mkdirp');
const constants = require('generator-jhipster/generators/generator-constants');

const MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;
const TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;
const FLUTTER_DIR = constants.CLIENT_MAIN_SRC_DIR + 'lib/';
const CLIENT_FLUTTER_TEMPLATES_DIR = 'flutter';

module.exports = {
    writeFiles
};

const flutterFiles = {
    root:[
        {
            templates: [
                'package.json',
            ]
        }
    ],
    common: [
        {
            path: MAIN_SRC_DIR,
            templates: [
                '.gitignore',
                '.metadata',
                'build.yaml',
                'pubspec.yaml',
                'README.md'
            ]
        }
    ],
    flutterApp: [
        {
            path: FLUTTER_DIR,
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
            path: FLUTTER_DIR,
            templates: [
                'shared/bloc/bloc_provider.dart',
                'shared/bloc/bloc.dart',
                'shared/containers/loading_indicator_widget.dart',
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
            path: FLUTTER_DIR,
            templates: [
                'main/main_bloc.dart',
                'main/main_screen.dart',
            ]
        }
    ],
    account: [
        {
            path: FLUTTER_DIR,
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
            path: FLUTTER_DIR,
            templates: [
                'l10n/intl_en.arb',
                'l10n/intl_fr.arb'
            ]
        }
    ],
    image: [
        {
            path: MAIN_SRC_DIR,
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

function writeFiles() {
    mkdirp(MAIN_SRC_DIR);
    // write Flutter files
    this.writeFilesToDisk(flutterFiles, this, false, `${CLIENT_FLUTTER_TEMPLATES_DIR}`);
}