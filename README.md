# Back to Top (volto-back-to-top)

[![npm](https://img.shields.io/npm/v/volto-back-to-top)](https://www.npmjs.com/package/volto-back-to-top
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://macagua.github.io/volto-back-to-top
[![CI](https://github.com/collective/volto-back-to-toporkflows/main.yml/badge.svg)](https://github.com/collective/volto-back-to-toptoporkflows/main.yml)

A new add-on for `Volto` that include a button to go back to the top when you scroll down the page.

## Features

It provides a simple way to access to `Back to Top` features such as:

<!-- List your awesome features here -->

- A button to go back to the top when you scroll down the page.

- A progress bar included in the button that visually indicates how much you've scrolled.

- Adds the option to customise the button icon via settings.

## Screenshots

### Back to top button

This `Volto` component looks like this:

![Back to top button](https://raw.githubusercontent.com/collective/volto-back-to-top/refs/heads/main/docs/docs/source/images/back_to_top_button.gif)

---

## Translations

This product support the following languages:

- English

## Compatibility

- Tested with `Node.js` 22.16.0, `Volto` 18, and `volto-light-theme` 7.8.6.

## Install it

To install in your project, the `volto-back-to-top` add-on, you must choose the method appropriate
to your version of `Volto`.

### Volto 18 and later

Add `volto-back-to-top` to your `package.json` file:

```json
"addons": [
    "volto-back-to-top": "*"
]
```

```json
"dependencies": {
    "volto-back-to-top": "workspace:*",
}
```

#### Install from GitHub

If you trying to install from `GitHub` you need edit the `mrs.developer.json` file:

```json
{
  "volto-back-to-top": {
    "develop": true,
    "output": "./packages/",
    "package": "volto-back-to-top",
    "url": "git@github.com:collective/volto-back-to-top.git",
    "https": "https://github.com/collective/volto-back-to-top.git",
    "branch": "main"
  }
}
```

The `mrs.developer.json` file is using by an `Node.js` utility called `mrs.developer` that makes
it easy to work with `npm` projects containing lots of packages, of which you only want to
develop some.

Also add `volto-back-to-top` to your `package.json` file:

```json
"addons": [
    "volto-back-to-top": "*"
]
```

```json
"dependencies": {
    "volto-back-to-top": "workspace:*",
}
```

---

Download and install the new add-on by running:

```shell
make install
```

Start `Volto` with:

```shell
make start
```

## Settings it

For use this add-on, you need to configure the following in the `settings.ts` file:

- `up_icon_default`: Up Icon default settings.

Example:

```javascript
import upSVG from '@plone/volto/icons/up.svg';

export default function install(config) {
  config.settings.up_icon_default = upSVG;
  return config;
}
```

## Test installation

Visit http://localhost:3000/ in a browser, and check the _Back to top_ button into the pages.

## Development

The development of this add-on is done in isolation using a new approach using pnpm workspaces and latest `mrs-developer` and other `Volto` core improvements.
For this reason, it only works with pnpm and `Volto` 18 (currently in alpha).

### Prerequisites ✅

- An [operating system](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) that runs all the requirements mentioned.
- [nvm](https://6.docs.plone.org/install/create-project-cookieplone.html#nvm)
- [Node.js and pnpm](https://6.docs.plone.org/install/create-project.html#node-js) 22
- [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
- [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
- [Docker](https://docs.docker.com/get-started/get-docker/) (optional)

### Installation 🔧

1. Clone this repository, then change your working directory.

    ```shell
    git clone git@github.com:collective/volto-back-to-top.git
    cd volto-back-to-top
    ```

2. Install this code base.

    ```shell
    make install
    ```

### Make convenience commands

Run `make help` to list the available commands.

```text
help                             Show this help
install                          Installs the add-on in a development environment
start                            Starts Volto, allowing reloading of the add-on during development
build                            Build a production bundle for distribution of the project with the add-on
i18n                             Sync i18n
ci-i18n                          Check if i18n is not synced
format                           Format codebase
lint                             Lint, or catch and remove problems, in code base
release                          Release the add-on on npmjs.org
release-dry-run                  Dry-run the release of the add-on on npmjs.org
test                             Run unit tests
ci-test                          Run unit tests in CI
backend-docker-start             Starts a Docker-based backend for development
storybook-start                  Start Storybook server on port 6006
storybook-build                  Build Storybook
acceptance-frontend-dev-start    Start acceptance frontend in development mode
acceptance-frontend-prod-start   Start acceptance frontend in production mode
acceptance-backend-start         Start backend acceptance server
ci-acceptance-backend-start      Start backend acceptance server in headless mode for CI
acceptance-test                  Start Cypress in interactive mode
ci-acceptance-test               Run cypress tests in headless mode for CI
```

### Development environment set up

Install package requirements.

```shell
make install
```

### Start developing

Start the backend.

```shell
make backend-docker-start
```

In a separate terminal session, start the frontend.

```shell
make start
```

### Lint code

Run ESlint, Prettier, and Stylelint in analyze mode.

```shell
make lint
```

### Format code

Run ESlint, Prettier, and Stylelint in fix mode.

```shell
make format
```

### i18n

Extract the i18n messages to locales.

```shell
make i18n
```

### Unit tests

Run unit tests.

```shell
make test
```

### Run Cypress tests

Run each of these steps in separate terminal sessions.

In the first session, start the frontend in development mode.

```shell
make acceptance-frontend-dev-start
```

In the second session, start the backend acceptance server.

```shell
make acceptance-backend-start
```

In the third session, start the Cypress interactive test runner.

```shell
make acceptance-test
```

### Run Storybook server

Ro run Start Storybook server on port 6006

```shell
make storybook-start
```

## Credits

Developed with the support of:

- [Instituto Municipal de Deportes - IMD, Seville City Council, Spain](https://imd.sevilla.org/).

  <!-- markdownlint-disable MD033 -->
  <img width="200" alt="IMD Logo" src="https://raw.githubusercontent.com/collective/volto-back-to-top/refs/heads/main/docs/docs/source/images/imd-ayto-logo.svg">
  <!-- markdownlint-enable MD033 -->

### Acknowledgements 🙏

Generated using [Cookieplone (1.1.0)](https://github.com/plone/cookieplone) and [cookieplone-templates (8e49881)](https://github.com/plone/cookieplone-templates/commit/8e498811980e38b7db5d5cb0f5645256feaa8799) on 2026-09-08 09:55:51.534423. A special thanks to all contributors and supporters!

## Authors

This product was developed by [Leonardo J. Caballero G.](https://github.com/macagua).

<!-- markdownlint-disable MD033 -->
<img width="100" alt="Leonardo J. Caballero G." src="https://avatars.githubusercontent.com/u/185395?v=4&size=100">
<!-- markdownlint-enable MD033 -->

## License

The project is licensed under the [MIT license](https://opensource.org/licenses/MIT).
