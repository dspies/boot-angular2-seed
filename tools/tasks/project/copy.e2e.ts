import * as gulp from 'gulp';
import { join } from 'path';

import { TMP_DIR, APP_DEST } from '../../config';

export = () => {

  let e2eSrc = [
    join(TMP_DIR, '**')
  ];

  return gulp.src(e2eSrc)
    .pipe(gulp.dest(APP_DEST));

};
