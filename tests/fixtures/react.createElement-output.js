

const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

const _react = _interopRequireDefault(require('react'));

const _createSvgIcon = _interopRequireDefault(require('./utils/createSvgIcon'));

const _default = (0, _createSvgIcon.default)((_react.default.createElement('path', {
  fill: 'none',
  d: 'M0 0h24v24H0V0z'
}), _react.default.createElement('path', {
  d: 'M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z'
})), 'NearMe');

exports.default = _default;
