import * as gulpLoadPlugins from 'gulp-load-plugins';

const plugins = <any>gulpLoadPlugins();

export = (done: any) => {
  plugins.cached.caches = {};
  return done();
};
