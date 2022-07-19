# KeyValueStore
> The **KeyValueStore** is a key-value in-memory store service written in NodeJS programming language. 
> Currently, it supports cache replacement policy FIFO and also flexible to change policy by injection.

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
## Tests
- Run testing command.
- All of test cases in !(keyValueStore.test.js)[]
```bash
npm run test
```