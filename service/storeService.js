class StoreService {
  _data = {};
  constructor() {
  }

  get(key) {
    return this._data[key];
  }

  set(key, value) {
    this._data[key] = value;
  }

}

module.exports = {
 StoreService,
}
