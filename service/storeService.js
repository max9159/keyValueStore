class StoreService {
  _data = {};
  constructor() {
    // Generate mock data to pretend data from a DataBase
    for (let i = 0; i < 10000; i++) {
      this._data[i] = `mock_data_${i}`
    }
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
