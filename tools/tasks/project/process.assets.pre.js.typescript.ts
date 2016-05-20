import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as merge from 'merge-stream';
import { join } from 'path';

import { TMP_DIR, TOOLS_DIR, BOOTSTRAP_MODULE, ENV } from '../../config';
import { makeTsProject, templateLocals } from '../../utils';

const plugins = <any>gulpLoadPlugins();

const INLINE_OPTIONS = {
  base: TMP_DIR,
  useRelativePaths: false,
  removeLineBreaks: true
};

const isDev = ENV === 'dev';

export = () => {
  let tsProject = makeTsProject();

  let typings = gulp.src([
    'typings/browser.d.ts',
    TOOLS_DIR + '/manual_typings/**/*.d.ts'
  ]);

  let baseSrc = [
    join(TMP_DIR, '**/*.ts'),
    '!' + join(TMP_DIR, '**/node_modules/**/*.ts')
  ];

  let src = baseSrc.concat(getGlobBasedOnEnv(ENV));

  let projectFiles = gulp.src(src)
   .pipe(plugins.cached());

  let result = merge(typings, projectFiles)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    // TODO css must be created prior to running this in order to merge it into the javascript
    .pipe(isDev ? plugins.util.noop() : plugins.inlineNg2Template(INLINE_OPTIONS))
    .pipe(plugins.typescript(tsProject));

  return result.js
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(TMP_DIR));
};

function getGlobBasedOnEnv(env: string): string[] {
  switch (env) {
    case 'dev':
      return ['!' + join(TMP_DIR, '**/*.spec.ts'),
              '!' + join(TMP_DIR, '**/*.e2e-spec.ts')];
    case 'test':
      return ['!' + join(TMP_DIR, '**/*.e2e-spec.ts'),
              '!' + join(TMP_DIR, `${BOOTSTRAP_MODULE}.ts`)];
    case 'e2e':
      return ['!' + join(TMP_DIR, '**/*.spec.ts')];
    case 'prod':
    default:
      return [];

  }
}
