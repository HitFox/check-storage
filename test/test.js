import proxyquire from 'proxyquire';
import test from 'tape';
import simple from 'simple-mock';

const trueStub = function () {
  return true;
};

const falseStub = function () {
  return false;
};

const trueMock = simple.mock().returnWith(true);

global.localStorage = {
  setItem: trueMock,
  getItem: trueMock,
  removeItem: trueMock
};

global.chrome = {
  'storage': {
    'sync': {
      set: trueMock,
      get: trueMock,
      remove: trueMock
    }
  }
};

test ('checkStorage tests with localStorage', function (t) {
  const storage = proxyquire('../index.js', {'has-localstorage': trueStub, '@noCallThru': true}).storage;
  t.notEqual(storage.type, 'chromeOrWebExt', 'if we find the localStorage API, we should not return chromeOrWebExt');
  t.equal(storage.type, 'localStorage', 'if we find the localStorage API, return localStorage');
  t.ok(storage.add(), 'should be ok to add an item via localStorage');
  t.ok(storage.get(), 'should be ok to retrieve an item via localStorage');
  t.ok(storage.remove(), 'should be ok to remove an item via localStorage');
  t.end();
});

test ('checkStorage tests with chrome', function (t) {
  const storage = proxyquire('../index.js', {'has-localstorage': falseStub, '@noCallThru': true}).storage;
  t.equal(storage.type, 'chromeOrWebExt', 'if we find the chrome API, return chromeOrWebExt');
  t.notEqual(storage.type, 'localStorage', 'if we find the chrome API, we should not return localStorage');
  t.ok(storage.add(), 'should be ok to add an item via chrome.storage API');
  t.ok(storage.get(), 'should be ok to retrieve an item via chrome.storage API');
  t.ok(storage.remove(), 'should be ok to remove an item via chrome.storage API');
  global.chrome = {'storage': false};
  t.end();
});
