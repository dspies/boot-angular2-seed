import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';
import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import { join } from 'path';

import { BROWSER_LIST, CSS_DIR, DEPENDENCIES, ENV, TMP_DIR } from '../../config';

const plugins = <any>gulpLoadPlugins();
const processors = [
  autoprefixer({
    browsers: BROWSER_LIST
  })
];
const isProd = ENV === 'prod';

let cleanCss = require('gulp-clean-css');

if (isProd) {
  processors.push(
    cssnano({
      discardComments: {removeAll: true}
    })
  );
}

function processComponentCss() {

  let cssSrc = [
    join(TMP_DIR, '**', '*.css'),
    '!' + join(TMP_DIR, 'node_modules', '**', '*.css')
  ];

  return gulp.src(cssSrc)
  //  todo reevaluate caching
  // .pipe(isProd ? plugins.cached('process-component-css') : plugins.util.noop())
    .pipe(plugins.postcss(processors))
    .pipe(gulp.dest(TMP_DIR));

}

function processExternalCss() {
  return gulp.src(getExternalCss().map(r => r.src))
    //  todo reevaluate caching
    // .pipe(isProd ? plugins.cached('process-external-css') : plugins.util.noop())
    .pipe(plugins.postcss(processors))
    //  todo move this to process.assets.post.css.bundle.dep
    // .pipe(isProd ? plugins.concatCss(CSS_PROD_BUNDLE) : plugins.util.noop())
    .pipe(isProd ? cleanCss() : plugins.util.noop())
    .pipe(gulp.dest(join(TMP_DIR, CSS_DIR)));
}

function getExternalCss() {
  return DEPENDENCIES.filter(d => /\.css$/.test(d.src));
}

export = () => merge(processComponentCss(), processExternalCss());
