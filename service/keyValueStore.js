class KeyValueStore {
  constructor(store, cache) {
    this._store = store;
    this._cache = cache;
  }

  get(key) {
    let value = this._cache.get(key)
    if(value) return value;

    value = this._store.get(key);
    this._cache.set(key, value);

    return value;
  }

  set(key, value) {
    this._store.set(key, value);
    this._cache.set(key, value);
  }

}

module.exports = {
  KeyValueStore: KeyValueStore
}
