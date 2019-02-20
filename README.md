# React.Fragment babel transpiler for preact applications [![Known Vulnerabilities](https://snyk.io/test/github/kontrollanten/babel-plugin-preact-fragment/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kontrollanten/babel-plugin-preact-fragment?targetFile=package.json)

## Important
This plugin will only remove the Fragment element if there's only one children. This can be
helpfull if you're rendering a SVG element which gets broken with the `<undefined />` wrapper.

If there's multiple children this plugin will skip transformation.

## Usage

### Download
```
yarn add babel-plugin-preact-fragment -D
# or
npm i babel-plugin-preact-fragment --save-dev
```

### Config your build pipeline

#### babel
In your babel config:
```
plugins: [
  'preact-fragment',
  ...
]
```

#### webpack with babel-loader
Be sure to include the code that's using React.Fragment, probably it's from node_modules.

```
{
  test: /\.(jsx|js)?$/,
  include: [
    path.resolve('src'),
    // Below is the module who's using React.Fragment
    path.resolve('node_modules/@material-ui/icons'),
  ],
  use: 'babel-loader'
},
```

## Covered use cases

Checkout tests/index.js (and the tests/fixtures dir) to see what this plugin is covering.
If you find any cases where it's not working, you're welcome to file an issue.
