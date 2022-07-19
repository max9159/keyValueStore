const { expect } = require('chai');
const { CacheConfig } = require('../config/cacheConfigs');
const { FifoStrategy } = require('../service/fifoStrategy');
const { KeyValueStore } = require('../service/keyValueStore');
const { StoreService } = require('../service/storeService');

describe('store', () => {
  let service = new KeyValueStore(new StoreService(), new FifoStrategy());

  describe('cache: set data', () => {
    beforeEach(() => {
      CacheConfig.MAXIMUM_BYTES_SIZE = 1000;
      service = new KeyValueStore(new StoreService(), new FifoStrategy());
    })

    it('should get the same data after set', async () => {

      // arrange
      const updateObject = { "key": "key1", "value": "val2" };

      // action
      await service.set(updateObject.key, updateObject.value);
      const result = await service.get(updateObject.key);

      // assert
      expect(result).to.equal(updateObject.value);
    })

    it('should remove first item from cache when over maximum size', async () => {

      // arrange
      CacheConfig.MAXIMUM_BYTES_SIZE = 10;
      const object1 = { "key": "key1", "value": "val2" };
      const object2 = { "key": "key2", "value": "val2" };

      // action
      await service.set(object1.key, object1.value);
      await service.set(object2.key, object2.value);
      const result = await service.get(object1.key);

      // assert
      expect(result).to.equal(object1.value);
    })


    it('should get correct result even set data during multi-threads', async () => {

      // arrange
      const object1 = { "key": "999999", "value": "2" };
      const object2 = { "key": "999999", "value": "5" };

      let set1 = service.set(object1.key, object1.value);
      const result1 = await service.get(object1.key);
      expect(result1).to.equal(object1.value);

      let set2 = service.set(object2.key, result1 * object2.value);
      const result2 = await service.get(object1.key);

      // assert
      expect(result2).to.equal(object1.value * object2.value);
    })
  })

})
