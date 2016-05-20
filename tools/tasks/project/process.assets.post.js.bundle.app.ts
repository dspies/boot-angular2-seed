import { join } from 'path';
import * as Builder from 'systemjs-builder';

import {
  BOOTSTRAP_MODULE,
  JS_PROD_APP_BUNDLE,
  JS_DIR,
  SYSTEM_BUILDER_CONFIG,
  TMP_DIR,
  ENV
} from '../../config';

const BUNDLER_OPTIONS = {
  format: 'cjs',
  minify: true,
  mangle: false
};

let isProd = (ENV === 'prod');

export = (done: any) => {

  if (isProd) {
    let builder = new Builder(SYSTEM_BUILDER_CONFIG);
    builder
      .buildStatic(
        join(TMP_DIR, BOOTSTRAP_MODULE),
        join(TMP_DIR, JS_DIR, JS_PROD_APP_BUNDLE),
        BUNDLER_OPTIONS
      )
      .then(() => done());
  } else {
    return done();
  }

};
