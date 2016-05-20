import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';

import { PROJECT_TASKS_DIR, SEED_TASKS_DIR } from './tools/config';
import { loadTasks } from './tools/utils';


loadTasks(SEED_TASKS_DIR);
loadTasks(PROJECT_TASKS_DIR);

gulp.task('build.dev', (done: any) =>
  runSequence('clean.all',
              'clear.caches',
              'build.dev.app',
              done));

gulp.task('build.dev.watch', (done:any) =>
  runSequence('build.dev',
              'watch.dev',
              done));

// --------------
// Build prod
// TODO needs to move injected css dependencies -> /css directory -> (possibly) a single bundle -> clean & minify
gulp.task('build.prod', (done: any) =>
  runSequence('clean.all',
              'clear.caches',
              'lint.pre',
              'copy.tmp',
              'process.assets',
              'process.html.prod',
              'copy.prod',
              done));

// --------------
// Build full test app, spawn karma tests, and watch
gulp.task('tdd', (done:any) =>
  runSequence('build.test',
    'karma.spawn',
    'watch.tdd')
);

// --------------
// Build full test app, spawn karma test
gulp.task('test', (done: any) =>
  runSequence('build.test',
    'karma',
    done));

// --------------
// Single-Run e2e
gulp.task('e2e', (done:any) =>
  runSequence('server.start.minimal',
    'e2e.build.test',
    'server.stop',
    done));

// --------------
// Continuous e2e
gulp.task('e2e.tdd', (done:any) =>
  runSequence('server.start.minimal',
              'e2e.build.test',
              'watch.e2e',
              done));

gulp.task('e2e.build.test', (done:any) =>
  runSequence('build.e2e',
              'protractor.angular',
              done));

// --------------
// Build tools.
gulp.task('build.tools', (done: any) =>
  runSequence('clean.tools',
              'build.js.tools',
              done));

// --------------
// Docs
gulp.task('docs', (done: any) =>
  runSequence('build.docs',
              'serve.docs',
              done));

// --------------
// Serve dev
gulp.task('serve.dev', (done: any) =>
  runSequence('build.dev',
              'server.start',
              'watch.dev',
              done));

// --------------
// Serve e2e
gulp.task('serve.e2e', (done: any) =>
  runSequence('build.e2e',
              'server.start',
              'watch.e2e',
              done));

// --------------
// Serve prod
gulp.task('serve.prod', (done: any) =>
  runSequence('build.prod',
              'server.prod',
              done));

// --------------
// Build dev app without cleaning or clearing caches
gulp.task('build.dev.app', (done:any) =>
  runSequence('lint.pre',
    'copy.tmp',
    'process.assets',
    'process.html.dev',
    'copy.dev',
    done)
);

// --------------
// Build e2e app
gulp.task('build.e2e', (done: any) =>
  runSequence('clean.all',
    'clear.caches',
    'build.e2e.app',
    done));

// --------------
// Rebuild e2e app without cleaning tmp or clearing caches
gulp.task('build.e2e.app', (done:any) =>
  runSequence('build.dev.app',
    done));

// --------------
// Rebuild test app and spawn karma tests
gulp.task('tdd.rebuild', (done: any) =>
  runSequence('build.test',
    'karma.spawn',
    done));

// --------------
// Build test
gulp.task('build.test', (done: any) =>
  runSequence('clean.all',
    'clear.caches',
    'build.test.app',
    done));

// --------------
// Build test app without cleaning tmp or clearing caches
gulp.task('build.test.app', (done:any) =>
  runSequence('lint.pre',
    'copy.tmp',
    'process.assets',
    'process.html.dev',
    'copy.test',
    done));

gulp.task('lint.pre', (done:any) =>
  runSequence('lint.pre.css',
    'lint.pre.js',
    done));

gulp.task('lint.pre.js', (done: any) =>
  runSequence('lint.pre.js.typescript',
    done));

gulp.task('lint.pre.css', (done: any) =>
  runSequence('lint.pre.css.sass',
    done));

gulp.task('copy.tmp', (done: any) =>
  runSequence('copy.tmp.app',
    'copy.tmp.dep',
    done));

gulp.task('process.assets.pre', (done:any) =>
  runSequence('process.assets.pre.css',
    'process.assets.pre.js',
    done));

gulp.task('process.assets.pre.js', (done:any) =>
  runSequence('process.assets.pre.js.typescript',
    done));

gulp.task('process.assets.pre.css', (done:any) =>
  runSequence('process.assets.pre.css.sass',
    done));

gulp.task('process.assets', (done:any) =>
  runSequence('process.assets.pre',
    'process.assets.css',
    'process.assets.js',
    'process.assets.post',
    done));

gulp.task('process.assets.post', (done:any) =>
  runSequence('process.assets.post.js',
    done));

gulp.task('process.assets.post.js', (done:any) =>
  runSequence('process.assets.post.js.bundle.dep',
    'process.assets.post.js.bundle.app',
    done));

gulp.task('process.html', (done:any) =>
  runSequence('noop',
    done));

gulp.task('process.assets.js', (done:any) =>
  runSequence('noop',
    done));

gulp.task('process.assets.css', (done:any) =>
  runSequence('process.assets.css.min',
    done));

gulp.task('noop', () => { });
