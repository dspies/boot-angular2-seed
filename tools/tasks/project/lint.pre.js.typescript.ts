import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import { APP_SRC, CODELYZER_RULES, TOOLS_DIR } from '../../config';

const plugins = <any>gulpLoadPlugins();

export = () => {
  // get all ts from APP_SRC and TOOL_DIR
  let src = [
    join(APP_SRC, '**/*.ts'),
    '!' + join(APP_SRC, '**/*.d.ts'),
    join(TOOLS_DIR, '**/*.ts'),
    '!' + join(TOOLS_DIR, '**/*.d.ts')
  ];

  // lint all ts from APP_SRC and TOOL_DIR
  return gulp.src(src)
    .pipe(plugins.cached('ts-lint'))
  // using CODELYZER rules
    .pipe(plugins.tslint({
      rulesDirectory: CODELYZER_RULES
    }))
    // report results
    .pipe(plugins.tslint.report(require('tslint-stylish'), {
      emitError: require('is-ci'),
      sort: true,
      bell: true
    }));
};

