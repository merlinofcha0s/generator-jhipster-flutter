# Introduction

![Generator](https://github.com/merlinofcha0s/generator-jhipster-flutter/workflows/Generator/badge.svg?branch=master&event=push)
![npm version](https://img.shields.io/npm/v/generator-jhipster-flutter-merlin)

Generate your Flutter mobile App (Android / iOS) for JHipster

This is a [JHipster](https://www.jhipster.tech/) module.

<img align="center" src="UI-1.3.0.gif">

# What's inside

- Screen
  - Main
  - Register
  - Login
  - User preferences
- Theming
  - All styles in one place
  - Light theme for now
- Full I18n support
  - EN, FR for now
  - Automatic generation with [flutter_intl plugin](https://plugins.jetbrains.com/plugin/13666-flutter-intl)
  - Detecting device locale
  - Change language in user preferences UI
  - Apply the preferred locale instead of the device one
- BLoC Architecture [More informations](https://medium.com/flutterpub/architecting-your-flutter-project-bd04e144a8f1)
- Language choice
  - Java / Kotlin for Android 
  - Objective C / Swift for iOS
- Profiles / Environments
  - Dev
  - Prod
- IntelliJ Config file for dev and prod profile

## Main Libraries

- [dart_json_mapper](https://pub.dev/packages/dart_json_mapper)
- [flutter_intl](https://plugins.jetbrains.com/plugin/13666-flutter-intl)
- [RxDart](https://pub.dev/packages/rxdart)

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) module, we expect you have JHipster and its related tools already installed:

- [Installing JHipster (6.x.x)](https://www.jhipster.tech/installation/)
- [Installing Flutter SDK (1.17.x)](https://flutter.dev/docs/get-started/install)
- Generating your app with 

```bash
jhipster
```

# Installation

## With NPM

To install this blueprint:

```bash
npm install -g generator-jhipster-flutter-merlin
```

To update this blueprint:

```bash
npm update -g generator-jhipster-flutter-merlin
```

## With Yarn

To install this blueprint:

```bash
yarn global add generator-jhipster-flutter-merlin
```

To update this blueprint:

```bash
yarn global upgrade generator-jhipster-flutter-merlin
```

# Usage

To use this blueprint, run 

```bash
yo jhipster-flutter-merlin
```

## Running local module version for development

During development of module, please note the below steps. They are very important.

1. Clone the projects

You'll probably need the current master of **generator-jhipster** :

- fork generator-jhipster: `https://github.com/jhipster/generator-jhipster/fork`
- clone locally your fork: `git clone https://github.com/<your_username>/generator-jhipster`
- `cd generator-jhipster`
- `git remote add upstream https://github.com/jhipster/generator-jhipster`
- so you'll be able to update regularly your fork, using `git fetch upstream && git checkout master && git rebase upstream/master`
- `npm ci`
- `npm link`

Then, about **jhipster-flutter** :

- fork jhipster-flutter: `https://github.com/jhipster/jhipster-flutter/fork`
- clone locally your fork: `git clone https://github.com/<your_username>/jhipster-flutter`
- `cd jhipster-flutter`
- `git remote add upstream https://github.com/jhipster/jhipster-flutter`
- so you'll be able to update regularly your fork, using `git fetch upstream && git checkout master && git rebase upstream/master`
- `npm ci`
- `npm link`
- `npm link generator-jhipster`


2. Create a new folder for the app to be generated and link JHipster and your blueprint there

```bash
mkdir my-app
cd my-app
npm link generator-jhipster-flutter-merlin
yo jhipster-flutter-merlin
```

# Help and contribution to the project

Feel free to help, the project is open to PR

# License

Apache-2.0 © Cyril Casaucau
