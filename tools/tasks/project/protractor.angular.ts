import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { argv } from 'yargs';

const elementExplorer = argv['elementExplorer'];

const plugins = <any>gulpLoadPlugins();

let ANGULAR_PROTRACTOR_CONFIG = () => {
  return {
    configFile: 'protractor.conf.js',
    debug: false,
    autoStartStopServer: true,
    args: (elementExplorer ? ['--elementExplorer'] : []) as any[]
  };
};

export = (done: any) => {
  console.log(ANGULAR_PROTRACTOR_CONFIG());

  gulp
    .src('./dist/dev/**/*.e2e-spec.js')
    .pipe(plugins.angularProtractor(ANGULAR_PROTRACTOR_CONFIG()))
    .on('error', (e: string) => {
      return done();
    })
    .on('end', done);
};
