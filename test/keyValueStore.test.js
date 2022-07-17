const { expect } = require('chai');
const { FifoStrategy } = require('../service/fifoStrategy');
const { KeyValueStore } = require('../service/keyValueStore');
const { StoreService } = require('../service/storeService');

describe('store', () => {
  let service = new KeyValueStore(new StoreService(), new FifoStrategy());

  describe('set data', () => {
    it('should get the same data after set', () => {

      // arrange
      const updateObject = { "key": "key1", "value": "val2" };

      // action
      service.set(updateObject.key, updateObject.value);
      const result = service.get(updateObject.key);

      // assert
      expect(result).to.equal(updateObject.value)
    })
  })
})
