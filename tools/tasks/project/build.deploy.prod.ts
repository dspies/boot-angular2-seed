import * as gulp from 'gulp';
import {PROD_DEST, DEPLOY_DEST} from '../../config';

export = () => {

  let src = [PROD_DEST + '/**/*'];

  return gulp.src(src, {base: PROD_DEST})
    .pipe(gulp.dest(DEPLOY_DEST));
}
