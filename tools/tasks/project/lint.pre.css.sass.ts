import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join} from 'path';

import {APP_SRC, APP_ASSETS, ENV} from '../../config';

const plugins = <any>gulpLoadPlugins();
var sasslint = require('gulp-sass-lint');

const isProd = ENV === 'prod';

function getSassAppAssets() {
  return APP_ASSETS.filter(d => /\.scss$/.test(d.src) && !d.vendor);
}

export = () => {

  let appSrc = [
    join(APP_SRC, '**', '*.scss')
  ];

  let externalSrc = getSassAppAssets().map(r => r.src);

  let sassSrc = appSrc.concat(externalSrc);

  // get all sass files from APP_SRC and APP_ASSETS
  return gulp.src(sassSrc)
  // cache them if they are new or have changed
    .pipe(isProd ? plugins.cached('sass-lint') : plugins.util.noop())
    // lint using node sass
    .pipe(sasslint())
    // format using node sass
    .pipe(sasslint.format())
    // fail if there is an error
    .pipe(sasslint.failOnError());
};

