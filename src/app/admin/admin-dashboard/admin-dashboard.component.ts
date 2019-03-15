import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {SelectivePreloadingStrategyService} from '../../selective-preloading-strategy.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  sessionId$: Observable<string>;
  token$: Observable<string>;
  modules: string[];

  constructor(private route: ActivatedRoute, private preloadStrategy: SelectivePreloadingStrategyService) {
    this.modules = preloadStrategy.preloadedModules;
  }

  ngOnInit() {
    // Capture the session ID if available
    // Here is only to show how to get the query param, currently it is not used anywhere
    // Put it to an HTML element to show
    this.sessionId$ = this.route.queryParamMap.pipe(
      map( params => params.get('session_id') || 'None')
    );

    // Capture the fragment if available
    this.token$ = this.route.fragment.pipe(
      map( fragment => fragment || 'None')
    );
  }

}
