const { CacheConfig } = require("../config/cacheConfigs");

class FifoStrategy {
  _byteSize = 0;
  _data = {};
  _keyStack = [];
  constructor() {
  }

  get(key) {
    return this._data[key];
  }

  set(key, value) {
    this.validateSize(key, value, this._byteSize);

    this._data[key] = value;
    this._keyStack.push(key);
    this._byteSize += this.getByteSize(key) + this.getByteSize(value);
  }

  getByteSize(str) {
    try {
      const bytes = Buffer.byteLength(str, "ascii");
      return bytes;
      
    } catch (error) {
      return 0;
    }
  };

  validateSize(key, value) {
    const keyValSize = this.getByteSize(key) + this.getByteSize(value);
    while (this._byteSize + keyValSize > CacheConfig.MAXIMUM_BYTES_SIZE) {
      this.removeItem();
    }
  }

  removeItem() {
    const removeKey = this._keyStack.shift();
    const removeVal = this._data[removeKey];
    delete this._data[removeKey];
    this._byteSize -= this.getByteSize(removeKey) + this.getByteSize(removeVal);
  }

}

module.exports = {
  FifoStrategy,
}
