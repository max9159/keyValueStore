
const http = require('http');
const url = require('url');
const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`Method: ${req.method} ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url.toLowerCase().includes('/api/store')) {
    if (req.method === 'GET') {
      const queryObject = url.parse(req.url.toLowerCase(), true).query;

      // TODO: Add KevValueStore.get(key);
      // const result = { key: queryObject.key, value: 'testVal' }; 

      res.end(JSON.stringify(result));
    } else if (req.method === 'POST') {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        console.log(`POST Body:${data}`);

        // TODO: Add KevValueStore.set(data)
        // const updateObject = JSON.parse(data);

        res.end();
      });
    }
  } else {
    res.end('Welcome to KevValueStore API Service.\rPlease use GET /api/store?key={key} and POST /api/store {key:string, value:string} to access the store.');
  }

});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})