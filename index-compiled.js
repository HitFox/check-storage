'use strict';

var _hasLocalstorage = require('has-localstorage');

var _hasLocalstorage2 = _interopRequireDefault(_hasLocalstorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if ((0, _hasLocalstorage2.default)()) {
  module.exports.storage = {
    type: 'localStorage',
    add: function add(key, value) {
      return localStorage.setItem(key, value);
    },
    get: function get(key) {
      return localStorage.getItem(key);
    },
    remove: function remove(key) {
      return localStorage.removeItem(key);
    }
  };
} else if (chrome.storage) {
  module.exports.storage = {
    type: 'chromeOrWebExt',
    add: function add(key, value) {
      return chrome.storage.sync.set({ key: key, value: value });
    },
    get: function get(key) {
      return chrome.storage.sync.set(key);
    },
    remove: function remove(key) {
      return chrome.storage.sync.remove(key);
    }
  };
}
