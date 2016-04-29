import {provide, enableProdMode, ReflectiveInjector} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {APP_BASE_HREF} from 'angular2/platform/common';
import {AppComponent} from './app/components/app.component';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'rxjs/Rx';
import {Config} from './app/shared/index';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

let injector = ReflectiveInjector.resolveAndCreate([HTTP_PROVIDERS]);
let http = injector.get(Http);

http.get('config')
  .map((res:any) => res.json())
  .subscribe((config:Config) => {
    bootstrap(AppComponent, [
      HTTP_PROVIDERS,
      ROUTER_PROVIDERS,
      provide('config', { useValue: config }),
      provide(APP_BASE_HREF, { useValue: config.baseUrl })
    ]);
  }) ;

// In order to start the Service Worker located at "./worker.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
//
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./worker.js').then((registration: any) =>
//       console.log('ServiceWorker registration successful with scope: ', registration.scope))
//     .catch((err: any) =>
//       console.log('ServiceWorker registration failed: ', err));
// }
