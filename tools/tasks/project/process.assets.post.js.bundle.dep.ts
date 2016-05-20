import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {InjectableDependency} from '../../config/seed.config.interfaces';

import { ENV, DEPENDENCIES, TMP_DIR } from '../../config';

const plugins = <any>gulpLoadPlugins();

const isProd = ENV === 'prod';

export = (done: any) => {

  if (isProd) {
    // get js dependencies
    let jsDependencies = getJavascriptDependencies();

    // get the unique named-group from dependencies
    let bundleGroupNames = getDependencyBundleGroupNames(jsDependencies);

    // collect the dependencies with each named-group
    bundleGroupNames.forEach((b) => {
      // bundle the named-group
      return gulp.src(getDependenciesByBundleGroupName(jsDependencies, b))
      // Strip comments and sourcemaps
        .pipe(plugins.uglify({
          mangle: false
        }))
        .pipe(plugins.concat(b + '.min.js'))
        .pipe(gulp.dest(TMP_DIR));
    });

    return done();
  } else {
    return done();
  }

};

function getDependenciesByBundleGroupName(jsDependencies: InjectableDependency[], name: string | boolean): any {
  return jsDependencies
    .filter(l => l.inject === name)
    .map(l => l.src);
}

function getJavascriptDependencies() {
  return DEPENDENCIES.filter(d => /\.js$/.test(d.src));
}

function getDependencyBundleGroupNames(jsDependencies: InjectableDependency[]): (string | boolean)[] {
  function uniqueBundle(value: string | boolean, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  return jsDependencies
    .map((d: InjectableDependency) => d.inject)
    .filter( uniqueBundle );
}
