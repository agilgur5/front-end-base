# Tasks

To run any of the tasks listed below (the headers), run `npx maid <task>`

## build:hmr

Runs a Node server with [`webpack-plugin-serve`](https://github.com/shellscape/webpack-plugin-serve)

- Incrementally rebuilds and hot-reloads the app whenever the source files change
- The app will be served from memory at [localhost:55555](http://localhost:55555)

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
