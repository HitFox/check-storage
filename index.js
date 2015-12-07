'use strict';

import hasLocalStorage from 'has-localstorage';

if (hasLocalStorage()) {
  module.exports.storage = {
    type: 'localStorage',
    add: (key, value) => localStorage.setItem(key, value),
    get: (key) => localStorage.getItem(key),
    remove: (key) => localStorage.removeItem(key)
  };
} else if (chrome.storage) {
  module.exports.storage = {
    type: 'chromeOrWebExt',
    add: (key, value) => chrome.storage.sync.set({key, value}),
    get: (key) => chrome.storage.sync.set(key),
    remove: (key) => chrome.storage.sync.remove(key)
  };
}
