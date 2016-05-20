import * as gulp from 'gulp';
import { join } from 'path';
import * as gulpLoadPlugins from 'gulp-load-plugins';

import { TMP_DIR, APP_DEST } from '../../config';

const plugins = <any>gulpLoadPlugins();

export = () => {

  return gulp.src(join(TMP_DIR, '**'))
    .pipe(plugins.cached('dev-app'))
    .pipe(gulp.dest(APP_DEST));

};
