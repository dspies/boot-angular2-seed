//:from build.assets.prod.ts
import * as gulp from 'gulp';
import { join } from 'path';
import * as gulpLoadPlugins from 'gulp-load-plugins';

import { APP_SRC, TMP_DIR, TEMP_FILES } from '../../config';

const plugins = <any>gulpLoadPlugins();

// // TODO There should be more elegant to prevent empty directories from copying
// let es: any = require('event-stream');
// var onlyDirs = function (es: any) {
//   return es.map(function (file: any, cb: any) {
//     if (file.stat.isFile()) {
//       return cb(null, file);
//     } else {
//       return cb();
//     }
//   });
// };

export = () => {
  let appSrc = [
    join(APP_SRC, '**'),
  ];

  let excludedSrc = TEMP_FILES.map((p) => { return '!' + p; });

  let allSrc = appSrc.concat(excludedSrc);

  // get all APP_SRC source files excluding temporary files created
  // by the IDE
  let projectFiles = gulp.src(allSrc)
    .pipe(plugins.cached());

  return projectFiles
    // // remove empty directories
    // .pipe(onlyDirs(es))
    // copy them to tmp
    .pipe(gulp.dest(TMP_DIR));
};
