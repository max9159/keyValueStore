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
    return new Promise((resolve, reject) => {
      this._data[key] = value;
      resolve(true);
    });
  }

}

module.exports = {
  StoreService,
}
