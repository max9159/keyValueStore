
const http = require('http');
const url = require('url');
const { CacheConfig } = require('./config/cacheConfigs');
const { FifoStrategy } = require('./service/fifoStrategy');
const { KeyValueStore } = require('./service/keyValueStore');
const { StoreService } = require('./service/storeService');
const PORT = 3000;
// Can inject another Strategy CacheService
const cacheService = CacheConfig.REPLACEMENT_POLICY === 'FIFO' ? new FifoStrategy() : undefined;
const keyValueStore = new KeyValueStore(new StoreService(), cacheService);

// A API Service to invoke KeyValueStore
const server = http.createServer((req, res) => {
  console.log(`Method: ${req.method} ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url.toLowerCase().includes('/api/store')) {
    if (req.method === 'GET') {

      const queryObject = url.parse(req.url.toLowerCase(), true).query;
      const result = keyValueStore.get(queryObject.key);
      res.end(JSON.stringify(result));

    } else if (req.method === 'POST') {

      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        console.log(`POST Body:${data}`);

        try {
          const updateObject = JSON.parse(data);
          keyValueStore.set(updateObject.key, updateObject.value);
          res.end('Successfully updated');

        } catch {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Bad Request');
        }

      });
    }
  } else {
    res.end('Welcome to KevValueStore API Service.\rPlease use GET /api/store?key={key} and POST /api/store {key:string, value:string} to access the store.');
  }

});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})