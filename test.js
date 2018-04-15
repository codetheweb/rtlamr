const rtlamr = require('./index.js');

/*rtlamr({}, (error, stream) => {
  stream.on('data', (data) => {
    console.log(data);
  });

  stream.on('end', () => {
    console.log('Finished!');
  });
})*/

rtlamr.single({id: 46705801}).then((data) => {
  console.log(data);
})
