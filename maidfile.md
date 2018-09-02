# Tasks

To run any of the tasks listed below (the headers), run `npx maid <task>`

## build:hmr

Runs a [`webpack-serve`](https://github.com/webpack-contrib/webpack-serve) Node server

- Incrementally rebuilds and hot-reloads the app whenever the source files change
- The app will be served from memory at [localhost:8080](http://localhost:8080)

```bash
webpack-serve
```

## build:watch

A slower alternative to `build:hmr` that doesn't hot-reload or run a server

- Will incrementally rebuild and output the bundle to disk on change
- Usually want to use `build:hmr`, but sometimes this can be useful as well

```bash
webpack --watch -d --progress
```

## build:prod

Outputs a minified, production build of the app

```bash
NODE_ENV=production webpack --progress
```

## clean

Cleans the build/ folder

```bash
rm -rf build/*
```

## deploy

`clean` + `build:prod`

Run tasks `clean` and `build:prod`

## Further Reading

1. [Maid Docs](https://github.com/egoist/maid)
