# React.Fragment babel transpiler for preact applications

## Usage

### Download
`yarn add babel-plugin-preact-fragment -D`
`npm i babel-plugin-preact-fragment --save-dev`

### Config your babel

#### babel.config.js
```
module.exports = function()  {
  return {
    ...
    plugins: [
      'preact-fragment',
      ...
    ]
  };
}
```


