"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rejectAction = exports.resolveAction = exports.registerAction = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subscriptions = [];

function registerAction(transaction) {
  return new _promise2.default(function (resolve, reject) {
    subscriptions.push({ transaction: transaction, resolve: resolve, reject: reject });
  });
}

function resolveAction(transaction, value) {
  var subscription = subscriptions[0];
  if (subscription && subscription.transaction === transaction) {
    subscription.resolve(value);
    subscriptions.shift();
  }
}

function rejectAction(transaction, error) {
  var subscription = subscriptions[0];
  if (subscription && subscription.transaction === transaction) {
    subscription.reject(error);
    subscriptions.shift();
  }
}

exports.registerAction = registerAction;
exports.resolveAction = resolveAction;
exports.rejectAction = rejectAction;