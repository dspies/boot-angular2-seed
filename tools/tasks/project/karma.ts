// import { watch } from '../../utils';

var gutil = require('gulp-util');
var path = require('path');
var karma = require('karma');
var karmaParseConfig = require('karma/lib/config').parseConfig;

function runKarma(configFilePath:any, options:any, cb:any) {

  configFilePath = path.resolve(configFilePath);

  var log=gutil.log, colors=gutil.colors;
  var config = karmaParseConfig(configFilePath, {});

  Object.keys(options).forEach(function(key) {
    config[key] = options[key];
  });

  var Server = karma.Server;
  let server = new Server(config, function(exitCode: any) {
    log('Karma has exited with ' + colors.red(exitCode));
    cb();
    process.exit(exitCode);
  });

  server.start();

}

export = (done: any) => {

  runKarma('karma.conf.js', {
    autoWatch: false,
    singleRun: true
  }, done);

  // runKarma('karma.conf.js', {
  //   autoWatch: true,
  //   singleRun: false
  // }, done);

};
