# React.Fragment babel transpiler for preact applications

## Usage

### Download
```
yarn add https://github.com/kontrollanten/babel-plugin-preact-fragment -D
# or
npm i https://github.com/kontrollanten/babel-plugin-preact-fragment --save-dev
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
