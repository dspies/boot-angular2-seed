import * as browserSync from 'browser-sync';
import * as path from 'path';

import { BROWSER_SYNC_CONFIG } from '../../config';
import {BrowserSyncConfiguration} from '../../tasks/project/task.interfaces';

let mergeBrowserSyncConfigs = (defaultConfig: any, taskConfig?: any) => {
  let browserSyncConfigurationObject: any = {};
  let att: any;
  for (att in defaultConfig) { browserSyncConfigurationObject[att] = defaultConfig[att]; }
  for (att in taskConfig) { browserSyncConfigurationObject[att] = taskConfig[att]; }

  return browserSyncConfigurationObject;
};

let runServer = (config?: BrowserSyncConfiguration) => {
  browserSync.init(mergeBrowserSyncConfigs(BROWSER_SYNC_CONFIG, config));
};

let listen = (config?: BrowserSyncConfiguration) => {
  // if (ENABLE_HOT_LOADING) {
  //   ng2HotLoader.listen({
  //     port: HOT_LOADER_PORT,
  //     processPath: file => {
  //       return file.replace(join(PROJECT_ROOT, APP_SRC), join('dist', 'dev'));
  //     }
  //   });
  // }
  runServer(config);
};

let changed = (files: any) => {
  if (!(files instanceof Array)) {
    files = [files];
  }

  let onlyStylesChanged =
    files
      .map((f:string) => path.parse(f).ext)
      .reduce((prev:string, current:string) => prev && (current === '.scss' || current === '.css'), true);

  // if (ENABLE_HOT_LOADING) {
  //   ng2HotLoader.onChange(files);
  // } else {
  //TODO: Figure out why you can't pass a file to reload
  if (onlyStylesChanged === false) {
    browserSync.reload(files);
  }else {
    browserSync.reload('*.css');
  }
  //}
};

let stop = () => {

  browserSync.exit();
};

export { listen, changed, stop };
