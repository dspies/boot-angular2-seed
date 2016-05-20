import * as gulp from 'gulp';
import { join } from 'path';

import { APP_DEST, BOOT_DEST } from '../../config';

export = () => {

  let clientSrc = [
    join(APP_DEST, '**/*')
  ];

  return gulp.src(clientSrc)
    .pipe(gulp.dest(BOOT_DEST));
};
