# Front End Base

Base boilerplate (ish) files from which to start a front-end app.
Cobbled together from various jobs and side projects to get something that is at least an optimal starting point for most projects and uses my preferred libraries.

Currently, this is mostly config for Git, NPM, Webpack, Babel, PostCSS, and Browserslist.
It also includes some starter files like polyfills.

## Table of Contents

I. [Front End Development](#front-end-development) <br />
II. [Further Reading](#further-reading)

## Front End Development

### Installing

```
npm install
```

### Using the Environment

See the [`maidfile`](maidfile.md) for a list of tasks available

### Installing New Packages

1. `npm i -D <package_name>` will install and save a package as a dev dependency
  - `npm i -S <package_name>` will install and save a package as a prod dependency
1. `import` the package where needed in the code

## Further Reading

1. [Webpack Docs](https://webpack.js.org/)
1. [NPM docs](https://docs.npmjs.com/)
