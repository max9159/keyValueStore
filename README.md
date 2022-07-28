# KeyValueStore
> The **KeyValueStore** is a key-value in-memory store service written in NodeJS programming language. 
> Currently, it supports the thread-safe with Locks and cache replacement policy FIFO (Also flexible to change policy by injection).

## Installation
- Ensure you have install NodeJS.
  - https://nodejs.org/en/download/
```bash
npm install
```

## Getting Started
- To start **KeyValueStore** API service.
```bash
npm start
```

## API Request Example
```console
## GET
curl --location --request GET "http://localhost:3000/api/store?key=3"

## POST
curl --location --request POST "http://localhost:3000/api/store" --header "Content-Type: application/json" --data-raw "{ \"key\": \"3\", \"value\": \"value3\"}"

```
## Unit-Tests
- Run testing command.
```bash
npm run test
```
- All of test cases in [keyValueStore.test](./test/keyValueStore.test.js)

## API-Tests
  - [integrationTests.http](./test/integrationTests.http)
  - Use above http file via plugin can send HTTP request such as [HTTP Client of IntelliJ](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html) or [REST Client of VSCode Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## Configuration
- [cacheConfigs](./config/cacheConfigs.js)
  - Can setup cache service's **MAXIMUM_BYTES_SIZE** and **REPLACEMENT_POLICY**
  - Currently supports **FIFO**, can add new strategy and implement the same as interface of [fifoStrategy.js](./service/fifoStrategy.js)

## Lock in NodeJS
- To prevent race condition the **KeyValueStore** implement lock mechanism in [Locker](./util/locker.js)

## Mock Data
- Mock data has been generated in the constructor of the [storeService](./service/storeService.js).
- The [storeService](./service/storeService.js) to pretend to be a DataBase store service.
