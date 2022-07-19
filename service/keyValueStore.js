const { Locker } = require('../util/locker');

class KeyValueStore {
  // a locker using on get/set for thread-safe
  locker = new Locker(); 

  constructor(store, cache) {
    this._store = store;
    this._cache = cache;
  }

  // Read-Through
  async get(key) {
    let unlock = await this.locker.lock();

    let value = this._cache.get(key)
    if (value) return value;

    value = this._store.get(key);
    this._cache.set(key, value);
    
    await unlock();
    return value;
  }

  // Write-Through
  async set(key, value) {
    let unlock = await this.locker.lock();

    this._store.set(key, value)
      .then(() => {
        this._cache.set(key, value);
      }).finally(async () => {
        await unlock();
      });
  }

}

module.exports = {
  KeyValueStore,
}
