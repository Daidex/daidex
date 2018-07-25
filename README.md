# DAIDEX 

## Features
* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [eslint](http://eslint.org)

## Requirements
* node `8x`
* yarn `^1.7.0` or npm `^5.0.0`

### Install from source

First, clone the project:

Then install dependencies and check to see it works. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic installs, but `npm install` will work just as well.

```bash
$ yarn install    # Install project dependencies
$ yarn start      # Compile and launch (same as `npm start`)
```

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:8080`.
|`build:dist`|Compiles the application to disk (`~/dist` by default).|
|`build:prod`|Same as `build:dist` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|

## API Specification

The API Specification can be found at [doc/API_SPECIFICATION.md](doc/API_SPECIFICATION.md)

## Application Structure

```
.
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── index.js              # Application bootstrap and rendering
│   ├── components           # Global Reusable Presentational Components
│   ├── containers           # Global Reusable Container Components
│   ├── pages                # Components that dictate major page structure
│   ├── routes               # Main route definitions and async split points
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers         # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
└── tests                    # Unit tests
```

### Static Deployments
If you are serving the application via a web server such as nginx, make sure to direct incoming routes to the root `~/dist/index.html` file and let react-router take care of the rest. If you are unsure of how to do this, you might find [this documentation](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#configuring-your-server) helpful. The Express server that comes with the starter kit is able to be extended to serve as an API or whatever else you need, but that's entirely up to you.


### Styles

Both `.scss!.sass` and `.css` file extensions are supported out of the box. After being imported, styles will be processed with [PostCSS](https://github.com/postcss/postcss) for minification and autoprefixing, and will be extracted to a `.css` file during production builds.