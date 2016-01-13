# [WIP] generator-react-redux-app

> Yeoman generator for [React](http://facebook.github.io/react/) with [Redux](http://redux.js.org/) lets you quickly set up a project including [mocha](https://mochajs.org/) test runner and [Webpack](http://webpack.github.io/) module system and written using ES6. It ships with [redux-devtools](https://github.com/gaearon/redux-devtools) for time travel and [react-transform-hmr](https://github.com/gaearon/react-transform-hmr) for live react components update.

## Installation

```bash
npm install -g yo
npm install -g generator-react-redux-app
```

## Usage:

```
  yo react-redux-app
```

## Commands

The following commands are available in your project:

```bash
## build bundle with webpack and start dev server
npm serve
```

## Subgenerators
  
### Router
##### Usage:

```
  yo react-redux-app:router [options] <routeName> <routePath> [<routeLabel>] [<routeIcon>]
```

##### Options:

```
  --parent  # Parent rote name (for subroutes)
```

##### Arguments:


```
  routeName     Type: String  Required: true
  routePath     Type: String  Required: true
  routeLabel    Type: String  Required: false
  routeIcon     Type: String  Required: false
```

## Generated app

![alt tag](https://raw.githubusercontent.com/tonypizzicato/generator-react-redux-app/master/react-redux.png)

## TODO

- Generate Route config with plain JSX component instead mapping config to routes 
- Add actions/reducers composition with multiple files
- Investigate router initial state
- Webpack prod config
- Tests generation
