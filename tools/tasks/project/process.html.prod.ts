import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join, sep, normalize } from 'path';
import * as slash from 'slash';

import {
  TMP_DIR,
  ASSET_URI_PREFIX
} from '../../config';
import { templateLocals } from '../../utils';

const plugins = <any>gulpLoadPlugins();

export = () => {

  let indexHtml = join(TMP_DIR, 'index.html');

  return gulp.src(indexHtml)
    .pipe(injectJs())
    .pipe(injectCss())
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(TMP_DIR));
};

function inject(...files: Array<string>) {
  return plugins.inject(gulp.src(files, { read: false }), {
    files,
    transform: transformPath()
  });
}

function injectJs() {
  return inject(
    join(TMP_DIR, '**/*.min.js'),
    '!' + join(TMP_DIR, 'node_modules', '*.min.js'),
    '!' + join(TMP_DIR, 'node_modules', '**', '*.min.js')
  );
}

function injectCss() {
  return inject(
    join(TMP_DIR, '*.css'),
    join(TMP_DIR, '**/*.css'),
    '!' + join(TMP_DIR, 'app', '*.css'),
    '!' + join(TMP_DIR, 'app', '**', '*.css'),
    '!' + join(TMP_DIR, 'node_modules', '*.css'),
    '!' + join(TMP_DIR, 'node_modules', '**', '*.css')
  );
}

function transformPath() {
  return function(filepath: string) {
    let path: Array<string> = normalize(filepath).split(sep);
    arguments[0] = join(ASSET_URI_PREFIX, path.slice(3, path.length).join(sep)) + `?${Date.now()}`;
    return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
  };
}
