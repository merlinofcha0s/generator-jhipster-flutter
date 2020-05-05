# Introduction

This is a [JHipster](https://www.jhipster.tech/) blueprint.

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) blueprint, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://www.jhipster.tech/installation/)

# Installation


## With NPM

To install this blueprint:

```bash
npm install -g generator-jhipster-flutter
```

To update this blueprint:

```bash
npm update -g generator-jhipster-flutter
```

## With Yarn

To install this blueprint:

```bash
yarn global add generator-jhipster-flutter
```

To update this blueprint:

```bash
yarn global upgrade generator-jhipster-flutter
```

# Usage

To use this blueprint, run 

```bash
jhipster --blueprints flutter
```

## Running local Blueprint version for development

During development of blueprint, please note the below steps. They are very important.

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

- fork jhipster-vuejs: `https://github.com/jhipster/jhipster-flutter/fork`
- clone locally your fork: `git clone https://github.com/<your_username>/jhipster-vuejs`
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
npm link generator-jhipster-flutter
jhipster -d --blueprints flutter
```

# License

Apache-2.0 ©