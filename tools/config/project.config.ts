import {join} from 'path';
import {SeedConfig} from './seed.config';
import {InjectableDependency} from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  DEPLOY_DEST   = `${this.DIST_DIR}/../src/main/resources/static/`;
  RELATIVE_PATHS       = true;

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    this.APP_SRC              = 'client/src/client';
    let additional_deps: InjectableDependency[] = [
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);

    // ----------------
    // SystemsJS Configuration.
    this.SYSTEM_CONFIG_DEV = {
      defaultJSExtensions: true,
      packageConfigPaths: [`${(this.RELATIVE_PATHS ? '.' : this.APP_BASE)}node_modules/*/package.json`],
      paths: {
        [this.BOOTSTRAP_MODULE]: `${(this.RELATIVE_PATHS ? './' : this.APP_BASE)}${this.BOOTSTRAP_MODULE}`,
        'angular2/*': `${(this.RELATIVE_PATHS ? './' : this.APP_BASE)}angular2/*`,
        'rxjs/*': `${(this.RELATIVE_PATHS ? './' : this.APP_BASE)}rxjs/*`,
        'app/*': `/app/*`,
        '*': `${(this.RELATIVE_PATHS ? './' : this.APP_BASE)}node_modules/*`
      },
      packages: {
        angular2: {defaultExtension: false},
        rxjs: {defaultExtension: false}
      }
    };

    this.SYSTEM_CONFIG = this.SYSTEM_CONFIG_DEV;
  }
}
