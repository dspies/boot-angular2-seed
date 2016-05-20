export = (done:any) => {

  const spawn = require('cross-spawn-async').spawn;
  spawn('gulp', ['karma'], {stdio: 'inherit'});

  return done();

};
