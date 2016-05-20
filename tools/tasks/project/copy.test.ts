import * as gulp from 'gulp';
import { join } from 'path';

import { TMP_DIR, APP_DEST } from '../../config';

export = () => {

  let testSrc = [
    join(TMP_DIR, '**'),
    '!' + join(TMP_DIR, 'node_modules'),
    '!' + join(TMP_DIR, 'node_modules', '**'),
  ];

  return gulp.src(testSrc)
    .pipe(gulp.dest(APP_DEST));

};
