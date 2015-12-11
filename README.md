# check-storage

This is a tiny module that tries to figure out what storage adaptor it should
use, sorting between localStorage and chrome.storage.sync (the equivalent
WebExtension API).

## Usage

```javascript
import { storage } from 'check-storage';

console.log(storage.type);
try {
  storage.add(key, value);
  storage.get(key);
  storage.remove(key);
} catch {
  console.log('storage not initialised. Maybe the env has neither API?')
}
```
