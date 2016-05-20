export = (done:any) => {

  const spawn = require('cross-spawn-async').spawn;
  const protractor = spawn('protractor', ['protractor.conf.js'], {stdio: 'inherit'});

  protractor.on('close', (code: any)=> {
    console.log(`protractor complete with ${code}`);
    return done();
  });

};
