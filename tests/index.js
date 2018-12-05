import path from 'path';
import * as babel from '@babel/core';
import pluginTester from 'babel-plugin-tester';
import plugin from '../src';

pluginTester({
  babel,
  plugin,
  pluginName: 'babel-plugin-preact-fragment',
  tests: {
    'it should return children when using React.Fragment': {
      code: '<React.Fragment><div /></React.Fragment>',
      output: '<div />;',
    },
    'it should return children when using Fragment': {
      code: 'import React, { Fragment } from \'react\'; <Fragment><div /></Fragment>',
      output: 'import React, { Fragment } from \'react\';\n<div />;',
    },
    'it should work with createElement': {
      fixture: path.join(__dirname, './fixtures/react.createElement-input.js'),
      outputFixture: path.join(__dirname, './fixtures/react.createElement-output.js'),
    },
  },
});
