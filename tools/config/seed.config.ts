import {join} from 'path';
import {argv} from 'yargs';

import {Environments, InjectableDependency} from './seed.config.interfaces';

export const ENVIRONMENTS:Environments = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod',
  TEST: 'test',
  E2E: 'e2e',
  UNKNOWN: 'unknown'
};


export class SeedConfig {

  get PORT() {
    return argv['port'] || 5555;
  }

  get PROJECT_ROOT() {
    return join(__dirname, '../..');
  }

  get ENV() {
    return getEnvironment();
  }

  get DEBUG() {
    return argv['debug'] || false;
  }

  get DOCS_PORT() {
    return argv['docs-port'] || 4003;
  }

  get COVERAGE_PORT() {
    return argv['coverage-port'] || 4004;
  }

  get APP_BASE() {
    return argv['base'] || '/';
  }

  get ENABLE_HOT_LOADING() {
    return argv['hot-loader'];
  }

  get HOT_LOADER_PORT() {
    return 5578;
  }

  get BOOTSTRAP_MODULE() {
    return this.ENABLE_HOT_LOADING ? 'hot_loader_main' : 'main';
  }

  get APP_TITLE() {
    return 'My Angular2 App';
  }

  get APP_SRC() {
    return 'src/client';
  }

  get ASSETS_DIR() {
    return `assets`;
  }

  get ASSETS_SRC() {
    return join(this.APP_SRC, this.ASSETS_DIR);
  }

  get CSS_DIR() {
    return `css`;
  }

  get CSS_SRC() {
    return join(this.APP_SRC, this.CSS_DIR);
  }

  get TOOLS_DIR() {
    return 'tools';
  }

  get SEED_TASKS_DIR() {
    return join(process.cwd(), this.TOOLS_DIR, 'tasks', 'seed');
  }

  get DOCS_DEST() {
    return 'docs';
  }

  get DIST_DIR() {
    return 'dist';
  }

  get DEV_DIR() {
    return `dev`;
  }

  get DEV_DEST() {
    return join(this.DIST_DIR, this.DEV_DIR);
  }

  get PROD_DIR() {
    return `prod`;
  }

  get PROD_DEST() {
    return join(this.DIST_DIR, this.PROD_DIR);
  }

  get TMP_DIR() {
    return `${this.DIST_DIR}/tmp`;
  }

  get APP_DEST() {
    switch (this.ENV) {
      case ENVIRONMENTS.PRODUCTION:
        return this.PROD_DEST;
      default:
        return this.DEV_DEST;
    }
  }

  get CSS_DEST() {
    return `${this.APP_DEST}/css`;
  }

  get JS_DIR() {
    return `js`;
  }

  get JS_DEST() {
    return join(this.APP_DEST, this.JS_DIR);
  }

  get VERSION() {
    return appVersion();
  }

  get USE_RELATIVE_PATHS() {
    return false;
  }

  get CSS_PROD_BUNDLE() {
    return 'all.css';
  }

  get JS_PROD_SHIMS_BUNDLE() {
    return 'shims.js';
  }

  get JS_PROD_APP_BUNDLE() {
    return 'app.js';
  }

  get VERSION_NPM() {
    return '2.14.2';
  }

  get VERSION_NODE() {
    return '4.0.0';
  }

  get CODELYZER_RULES() {
    return customRules();
  }

  dependencies_from_npm:InjectableDependency[] = [
    {src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims', env: [ENVIRONMENTS.DEVELOPMENT, ENVIRONMENTS.E2E]},
    {src: 'zone.js/dist/zone.js', inject: 'libs'},
    {src: 'reflect-metadata/Reflect.js', inject: 'shims'},
    {src: 'es6-shim/es6-shim.js', inject: 'shims'},
    {src: 'systemjs/dist/system.src.js', inject: 'shims', env: [ENVIRONMENTS.DEVELOPMENT, ENVIRONMENTS.E2E]},
    {src: 'rxjs/bundles/Rx.js', inject: 'libs', env: [ENVIRONMENTS.DEVELOPMENT, ENVIRONMENTS.E2E]}
  ];
  temporaryIdeFiles = [
    '**/*___jb_tmp___',
    '**/*~',
    '**/__*'
  ];

  get NPM_DEPENDENCIES():InjectableDependency[] {
    return this.dependencies_from_npm;
  }

  set NPM_DEPENDENCIES(deps:InjectableDependency[]) {
    this.dependencies_from_npm = deps;
  }

  appendNpmDependencies(deps:InjectableDependency[]):InjectableDependency[] {
    this.dependencies_from_npm = this.dependencies_from_npm.concat(deps);
    return this.NPM_DEPENDENCIES;
  }

  // Declare local files that needs to be injected
  get APP_ASSETS():InjectableDependency[] {
    return [
      // { src: `${this.CSS_SRC}/main.css`, inject: true, vendor: false }
    ];
  }

  // Editor temporary files to ignore in watcher and asset builder.
  get TEMP_FILES():string[] {
    return this.temporaryIdeFiles;
  }

  set TEMP_FILES(globs:string[]) {
    this.temporaryIdeFiles = globs;
  }

  get DEPENDENCIES():InjectableDependency[] {
    return normalizeDependencies(this.NPM_DEPENDENCIES.filter(filterDependency.bind(null, this.ENV)))
      .concat(this.APP_ASSETS.filter(filterDependency.bind(null, this.ENV)));
  }

  // ----------------
  // SystemsJS Configuration.
  get SYSTEM_CONFIG_DEV():any {

    return {
      defaultJSExtensions: true,
      packageConfigPaths: [
        this.SYSTEM_JS_URI_PREFIX + 'node_modules/*/package.json',
        this.SYSTEM_JS_URI_PREFIX + 'node_modules/**/package.json',
        this.SYSTEM_JS_URI_PREFIX + 'node_modules/@angular/*/package.json'
      ],
      paths: {
        [this.BOOTSTRAP_MODULE]: this.SYSTEM_JS_URI_PREFIX + this.BOOTSTRAP_MODULE,
        'rxjs/*': this.SYSTEM_JS_URI_PREFIX + 'rxjs/*',
        'app/*': `/app/*`,
        '*': this.SYSTEM_JS_URI_PREFIX + 'node_modules/*',
      },
      packages: {
        rxjs: {defaultExtension: false}
      }
    };
  }

  get SYSTEM_CONFIG():any {
    return this.SYSTEM_CONFIG_DEV;
  }

  get SYSTEM_BUILDER_CONFIG():any {
    return {
      defaultJSExtensions: true,
      packageConfigPaths: [
        join(this.PROJECT_ROOT, 'node_modules', '*', 'package.json'),
        join(this.PROJECT_ROOT, 'node_modules', '@angular', '*', 'package.json')
      ],
      paths: {
        [`${this.TMP_DIR}/*`]: `${this.TMP_DIR}/*`,
        '*': 'node_modules/*'
      },
      packages: {
        '@angular/core': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        '@angular/compiler': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        '@angular/common': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        '@angular/http': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        '@angular/platform-browser': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        '@angular/platform-browser-dynamic': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        '@angular/router-deprecated': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        '@angular/router': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        'rxjs': {
          defaultExtension: 'js'
        }
      }
    };
  }

  // ----------------
  // Autoprefixer configuration.
  get BROWSER_LIST() {
    return [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ];
  }

  // ----------------
  // Browser Sync configuration.
  // todo evaluate
  get BROWSER_SYNC_CONFIG():any {
    return {
      middleware: [require('connect-history-api-fallback')({index: `${this.APP_BASE}index.html`})],
      port: this.PORT,
      startPath: this.APP_BASE,
      server: {
        baseDir: `${this.DIST_DIR}/empty/`,
        routes: {
          [`${this.APP_BASE}${this.APP_DEST}`]: this.APP_DEST,
          [`${this.APP_BASE}node_modules`]: 'node_modules',
          [`${this.APP_BASE.replace(/\/$/, '')}`]: this.APP_DEST
        }
      }
    };
  }

  get ASSET_URI_PREFIX():string {
    return (this.USE_RELATIVE_PATHS ? '' : this.APP_BASE);
  }

  get SYSTEM_JS_URI_PREFIX():string {
    return (this.USE_RELATIVE_PATHS ? './' : this.APP_BASE);
  }

}


// --------------
// Utils.

function filterDependency(env:string, d:InjectableDependency):boolean {
  if (!d.env) {
    d.env = Object.keys(ENVIRONMENTS).map(k => ENVIRONMENTS[k]);
  }
  if (!(d.env instanceof Array)) {
    (<any>d).env = [d.env];
  }
  return d.env.indexOf(env) >= 0;
}

export function normalizeDependencies(deps:InjectableDependency[]) {
  deps
    .filter((d:InjectableDependency) => !/\*/.test(d.src)) // Skip globs
    .forEach((d:InjectableDependency) => {
      d.relativeSrc = d.relativeSrc || d.src;
      d.src = require.resolve(d.src);
    });
  return deps;
}

function appVersion():number|string {
  var pkg = require('../../package.json');
  return pkg.version;
}

function customRules():string[] {
  var lintConf = require('../../tslint.json');
  return lintConf.rulesDirectory;
}

let cachedEnvironment: string = undefined;
function getEnvironment(): string {
  cachedEnvironment = (cachedEnvironment || retrieveAndCacheEnvironment());
  return cachedEnvironment;
}

function retrieveAndCacheEnvironment(): string {
  let base:string[] = argv['_'];
  let env = (argv['env'] || '').toLowerCase();

  if (env) {
    return extractEnvironment(env);
  } else {
    if (base) {
      let environment: string;

      for (let i = base.length-1; i > -1; i--) {
        environment = extractEnvironment(base[i]);

        if (environment !== ENVIRONMENTS.UNKNOWN) {
          return environment;
        }
      }
    }
    return ENVIRONMENTS.UNKNOWN;
  }
}

function extractEnvironment(envArg:string):string {
  if (envArg.includes(ENVIRONMENTS.PRODUCTION)) {
    return ENVIRONMENTS.PRODUCTION;
  } else if (envArg.includes(ENVIRONMENTS.TEST)) {
    return ENVIRONMENTS.TEST;
  } else if (envArg.includes(ENVIRONMENTS.E2E)) {
    return ENVIRONMENTS.E2E;
  } else if (envArg.includes(ENVIRONMENTS.DEVELOPMENT)) {
    return ENVIRONMENTS.DEVELOPMENT;
  } else {
    return ENVIRONMENTS.UNKNOWN;
  }
}

