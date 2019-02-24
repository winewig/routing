import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {slideInAnimation} from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'angular-router-sample';

  /**
   * Return the animation property from the route const data provided through the ActivatedRoute.
   * @param outlet RouterOutlet
   */
  public getAnimationData(outlet: RouterOutlet) {
    console.log('RouterOutlet is: ', outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
