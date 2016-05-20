import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';
import {join} from 'path';
import { TMP_DIR, BROWSER_LIST, ENV } from '../../config';

const plugins = <any>gulpLoadPlugins();
const isProd = ENV === 'prod';
const SASS_OPTIONS = {};
const processors = [
  autoprefixer({
    browsers: BROWSER_LIST
  })
];

if (isProd) {
  processors.push(
    cssnano({
      discardComments: {removeAll: true}
    })
  );
}

// TODO may be able to combine these if the separate caching is not required
export = () => merge(processComponentScss(), processExternalScss());

function processComponentScss() {

  let sassSrc = [
    join(TMP_DIR, '**', '*.scss'),
    '!' + join(TMP_DIR, 'assets', '**', '*.scss')
  ];

  return gulp.src(sassSrc, {base: TMP_DIR})
    .pipe(plugins.sass(SASS_OPTIONS))
    .pipe(plugins.cached('components-sass'))
    .pipe(plugins.postcss(processors))
    .pipe(gulp.dest(TMP_DIR));
}

function processExternalScss() {

  let assetsSassSrc = [
    join(TMP_DIR, 'assets', '**', '*.scss')
  ];

  return gulp.src(assetsSassSrc, {base: TMP_DIR})
    .pipe(plugins.sass(SASS_OPTIONS))
    // TODO reevaluate caching
    // .pipe(isProd ? plugins.cached('process-external-css') : plugins.util.noop())
    .pipe(plugins.postcss(processors))
    // // TODO Move the creation of the CSS PROD Bundle to another phase
    // .pipe(isProd ? plugins.concat(CSS_PROD_BUNDLE) : plugins.util.noop())
    .pipe(gulp.dest(join(TMP_DIR)));
}
