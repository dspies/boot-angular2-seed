import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join} from 'path';

import {PROJECT_ROOT, TMP_DIR} from '../../config';

const plugins = <any>gulpLoadPlugins();

const NPM_FILES_OPTIONS = {
  includeDevDependencies: false,
  packageJsonFilePath: join(PROJECT_ROOT, 'package.json')
};

export = () => {
  return gulp.src(plugins.npmFiles(
                     (NPM_FILES_OPTIONS.includeDevDependencies ? true : null),
                     NPM_FILES_OPTIONS.packageJsonFilePath), {base: PROJECT_ROOT})
    .pipe(plugins.cached('npm-dependencies'))
    .pipe(gulp.dest(TMP_DIR));
};
