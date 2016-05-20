import * as gulp from 'gulp';
import { join } from 'path';

import { TMP_DIR, APP_DEST } from '../../config';

export = () => {

  let productionSrc = [
    join(TMP_DIR, 'index.html'),
    join(TMP_DIR, '**/*.min.js'),
    '!' + join(TMP_DIR, 'node_modules/**/*.js'),
    join(TMP_DIR, '**/*.css'),
    '!' + join(TMP_DIR, 'node_modules/**/*.css'),
    '!' + join(TMP_DIR, 'app/**/*.css')
  ];

  return gulp.src(productionSrc)
    .pipe(gulp.dest(APP_DEST));
};
