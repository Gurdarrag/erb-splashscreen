<p>
  Electron React Boilerplate Splashscreen uses <a href="https://electron.atom.io/">Electron</a>, <a href="https://electron-react-boilerplate.js.org/">Electron React Boilerplate</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="https://webpack.js.org/">Webpack</a> and <a href="https://www.npmjs.com/package/react-refresh">React Fast Refresh</a>.
</p>

<br>

<div style="text-align: center">

[![Build Status][github-actions-status]][github-actions-url]
[![Github Tag][github-tag-image]][github-tag-url]

[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/Fjy3vfgy5q)
[![StackOverflow][stackoverflow-img]][stackoverflow-url]

</div>

## Install

Clone the repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/Gurdarrag/erb-splashscreen.git your-project-name
cd your-project-name
npm install
```

**Having issues installing? See our [debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

## What is ERB Splashscreen

ERB Splashscreen is a project based on Electron React Boilerplate.<br>
This project provides a way to create a splashscreen window for an Electron App, where you can display some information or use it as a setuper window

### How it works

ERB Splashscreen is a common Electron app based on two process, main and renderer<br>

#### Main

Main process manage the creation of the Electron app and render a splashscreen window when Electron app is ready.<br>
During the splashscreen window, app is running some step of configuration (AppUpdater, DBConnect, ...).<br>
You can defines these steps in the [Configurator class](./src/main/config/Configurator.ts)
Then, when all steps are finished, app will close splashscreen window and render main window

#### Renderer

Renderer directory is composed of two directory which host React app.

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## Community

Join our Discord: https://discord.gg/Fjy3vfgy5q

[github-actions-status]: https://github.com/Gurdarrag/erb-splashscreen/workflows/Test/badge.svg
[github-actions-url]: https://github.com/Gurdarrag/erb-splashscreen/actions
[github-tag-image]: https://img.shields.io/github/tag/Gurdarrag/erb-splashscreen.svg?label=version
[github-tag-url]: https://github.com/Gurdarrag/erb-splashscreen/releases/latest
[stackoverflow-img]: https://img.shields.io/badge/stackoverflow-electron_react_boilerplate-blue.svg
[stackoverflow-url]: https://stackoverflow.com/questions/tagged/electron-react-boilerplate
