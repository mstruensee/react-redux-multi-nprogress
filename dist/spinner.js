'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLoader = require('react-loader');

var _reactLoader2 = _interopRequireDefault(_reactLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = function Spinner(props, _ref) {
  var store = _ref.store;

  var _store$getState = store.getState();

  var PendingTasks = _store$getState.PendingTasks;

  return _react2.default.createElement(_reactLoader2.default, _extends({}, props, { loaded: PendingTasks === 0 }));
};

Spinner.contextTypes = {
  store: _react2.default.PropTypes.shape({
    getState: _react2.default.PropTypes.func.isRequired
  })
};

exports.default = Spinner;