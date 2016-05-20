import * as gulp from 'gulp';
import { templateLocals } from '../../utils';
import { join } from 'path';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as slash from 'slash';

import { PROJECT_ROOT, TMP_DIR, ASSET_URI_PREFIX, USE_RELATIVE_PATHS, DEPENDENCIES, CSS_DIR } from '../../config';

const plugins = <any>gulpLoadPlugins();


export = () => {

  let indexHtml = join(TMP_DIR, 'index.html');

  return gulp.src(indexHtml)
    .pipe(injectDependencies('shims'))
    .pipe(injectDependencies('libs'))
    .pipe(injectDependencies('assets'))
    .pipe(injectCss())
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(TMP_DIR));

};

function injectDependencies(name?: string) {

  return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), {
    read: false,
    cwd: join(PROJECT_ROOT, TMP_DIR)
  }), {
    relative: USE_RELATIVE_PATHS,
    name,
    transform: transformPath()
  });
}

function injectCss() {
  let fullPathToTempDir = join(PROJECT_ROOT, TMP_DIR);
  let cssDir = join(fullPathToTempDir, CSS_DIR);
  let cssSrc = [
    join(cssDir, '*.css'),
    join(cssDir, '**/*.css')
  ];

  return plugins.inject(
    gulp.src(cssSrc, { read: false, cwd: fullPathToTempDir }), {
      relative: USE_RELATIVE_PATHS,
      name: 'css',
      transform: transformPath()
    });
}

function getInjectablesDependenciesRef(name?: string) {
  return DEPENDENCIES
    .filter(dep => dep['inject'] && dep['inject'] === (name || true))
    .map(mapPath);
}

function mapPath(dep: any) {
  return join('node_modules', dep.relativeSrc);
}

function transformPath() {
  return function (filepath: string) {
    arguments[0] = join(ASSET_URI_PREFIX, filepath) + `?${Date.now()}`;
    return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
  };
}
