'use strict';

const { spawn } = require('child_process');
const { Stream } = require('stream');

var run = function(a, cb) {
  let argumentArr = ['-format=json']

  for (var key in a) {
    argumentArr.push('-' + key.toLowerCase() + '=' + a[key]);
  }

  const child = spawn('rtlamr', argumentArr);

  const chunkStream = new Stream();

  cb(null, chunkStream);

  child.stdout.on('data', (chunk) => {
    chunkStream.emit('data', JSON.parse(chunk.toString()));
  });

  child.on('close', (code) => {
    chunkStream.emit('end');
  })
}

var singleId = function(a, cb) {
  if (!a.timeout) {
    a.timeout = 60;
  }

  return new Promise((resolve, reject) => {
    run({filterId: a.id, duration: a.timeout.toString() + 's', single: true}, (error, stream) => {
      if (error) {
        reject(error);
      }

      stream.on('data', (data) => {
        resolve(data);
      });

      stream.on('end', () => {
        reject('Timed out.');
      });
    });
  });
}

module.exports.run = run;
module.exports.single = singleId;
