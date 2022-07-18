const { expect } = require('chai');
const { CacheConfig } = require('../config/cacheConfigs');
const { FifoStrategy } = require('../service/fifoStrategy');
const { KeyValueStore } = require('../service/keyValueStore');
const { StoreService } = require('../service/storeService');

describe('store', () => {
  let service = new KeyValueStore(new StoreService(), new FifoStrategy());

  describe('cache: set data', () => {
    beforeEach(() => service = new KeyValueStore(new StoreService(), new FifoStrategy()))

    it('should get the same data after set', () => {

      // arrange
      const updateObject = { "key": "key1", "value": "val2" };

      // action
      service.set(updateObject.key, updateObject.value);
      const result = service.get(updateObject.key);

      // assert
      expect(result).to.equal(updateObject.value);
    })

    it('should remove first item from cache when over maximum size', () => {

      // arrange
      CacheConfig.MAXIMUM_BYTES_SIZE = 10;
      const updateObject = { "key": "key1", "value": "val2" };
      const updateObject2 = { "key": "key2", "value": "val2" };

      // action
      service.set(updateObject.key, updateObject.value);
      service.set(updateObject2.key, updateObject2.value);
      const result = service.get(updateObject.key);

      // assert
      expect(result).to.equal(updateObject.value);
    })
  })

})
