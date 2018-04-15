# rtlamr-node

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-resentment.svg)](https://forthebadge.com)

A wrapper for [rtlamr](https://github.com/bemasher/rtlamr) in NodeJS.  To use this, rtlamr must be in your $PATH.

## Installation

  `npm install codetheweb/rtlamr-node`

## Usage

```javascript
const rtlamr = require('rtlamr-node');

// Get single meter reading
rtlamr.single({id: xxxxxxxx}).then((data) => {
  console.log(data);
});

// Get stream of multiple meter readings
rtlamr.run({duration: 300}, (error, stream) => {
  stream.on('data', (data) => {
    console.log(data);
  });

  stream.on('end', () => {
    console.log('Finished!');
  });
});
```

**Make sure `rtl_tcp` is running when using `rtlamr-node`.**

`run()` takes the same arguments as the original `rtlamr`.  For example, to connect to a remote RTL_TCP server, you would pass in `{'server': '192.168.0.xxx:zzzz'}` as an argument.

`single()` takes an object with two properties, `id` and `timeout`.  `timeout` is in seconds and is optional.
