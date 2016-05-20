import { join } from 'path';

import { SeedConfig } from './seed.config';
import { InjectableDependency } from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {

  constructor() {
    super();

    // this.APP_TITLE = 'Put name of your app here';
    let additional_deps: InjectableDependency[] = [
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    this.appendNpmDependencies(additional_deps);

    let additionalIdeFiles = ['**/*___*'];
    this.TEMP_FILES = this.TEMP_FILES.concat(additionalIdeFiles);
  }

  get PROJECT_TASKS_DIR() {
    return join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  }

  get BOOT_DEST(): string {
    return join(this.PROJECT_ROOT, 'srv/main/resources/static');
  }

  get JS_PROD_APP_BUNDLE() {
    return 'app.min.js';
  }

  get USE_RELATIVE_PATHS(): boolean {
    return true;
  }

}
