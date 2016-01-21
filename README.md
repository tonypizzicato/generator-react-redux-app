# generator-react-redux-app

> Yeoman generator for [React](http://facebook.github.io/react/) with [Redux](http://redux.js.org/) lets you quickly set up a project including [mocha](https://mochajs.org/) test runner and [Webpack](http://webpack.github.io/) module system and written using ES6. It ships with [redux-devtools](https://github.com/gaearon/redux-devtools) for time travel and [react-transform-hmr](https://github.com/gaearon/react-transform-hmr) for live react components update.
Development workflow is similar to one described in [this great article](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html).

## Installation

```bash
# Install yeoman
npm install -g yo 

# Install this generator
npm install -g generator-react-redux-app
```

## Usage:
Generate app structure:

```bash
  # Create project dir and get into it
  mkdir sample-react-redux-app && cd sample-react-redux-app
  
  # Run app generator
  yo react-redux-app #generates app structure
```
Generate app routes:
```bash
  # generate client users page (components/pages/Users.jsx) with new menu item
  yo react-redux-app:router users
```
It will generate new page with menu item, actions to fetch/remove/add entities, reducer for handling this actions and express server routes with sample data.

## Commands

The following commands are available in your project:

```bash
## build bundle with webpack and start dev server
npm run serve

## run dev backend server (if enabled on app generation)
npm run server
```

## Subgenerators

### Router
This command generates client side route with menu item and sample page. Routes config saved in ```config/routes.json```.
Menu item icon is also configured here and uses [Google Material Icons](https://design.google.com/icons/).

##### Usage:
```bash
  yo react-redux-app:router <routeName> [options] 
```
##### Arguments:
```bash
  routeName # The name of generated route. Used for menu label and route path  Required: true
```
##### Options:
```bash
  -p, --parent  # The name of parent route, that generated one will be nested in
  -e, --with-no-entity  # Disable generation of entity and api handlers
```
If ```--with-no-entity``` option is not present, this command will generate server api handlers for ```<routeName>``` entity and actions/reducer for handling fetch/add/remove actions on client.
```npm run server``` restart required.

If ```--with-no-entity``` is set, then only new page component and menu item would be generated with new route.

### Entity
This command generates fetch action and reducer for <name> entity. If -with-no-api options is not proveded, it also generates simple handler on backend server for fetch calls. ```npm run serve``` restart required.

If remotePath is not provided, it is generated as ```http://localhost:<backendPort>/api/<name>``` and simple handler is generated(if no --with-no-api). ```npm run server``` restart required.

##### Usage:
```bash
  yo react-redux-app:entity <name> [<remotePath>] [options]
```
##### Arguments:
```bash
  name        # Name of generated entity  Type: String  Required: true
  remotePath  # Remote api path to fetch entities from  Required: false
```
##### Options:
```bash
   -n,   --with-no-api   # Disable backend api handler for fetch requests
```

## Generated app
![alt tag](https://raw.githubusercontent.com/tonypizzicato/generator-react-redux-app/master/react-redux.png)

## Changelog
Recent changes can be viewed on Github on the [Releases Page](https://github.com/tonypizzicato/generator-react-redux-app/releases)

## TODO

- Generate Route config with plain JSX component instead mapping config to routes 
- Webpack prod config
- Tests generation

## License
MIT