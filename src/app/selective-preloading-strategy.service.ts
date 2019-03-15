import { Injectable } from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {

  preloadedModules: string[] = [];

  constructor() { }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if ( route.data && route.data['preload']) {

      // add the route path to the preloaded module array
      this.preloadedModules.push(route.path);

      // log the route path to the console
      console.log('Preloaded: ' + route.path);

      return load(); // 'load' function that can load the routed module asynchronously.
    } else {
      return of(null);
    }
  }
}
