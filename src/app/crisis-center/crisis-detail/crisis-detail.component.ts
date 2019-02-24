import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import { CrisisService } from '../crisis.service';
import { Crisis } from '../crisis';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis: Crisis;


  @Input() hero: Crisis;
  private hero$: Observable<Crisis>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(`Hero detail gets the route param: ${params.keys}`);
        return this.service.getCrisis(params.get('id'));
      })
    );
  }

  gotoHeroes(hero: Crisis) {
    const heroId = hero ? hero.id : null;
    this.router.navigate(['/heroes', {id: heroId, foo: 'foo'}])
      .then( () =>
        console.log('Back to Heroes from hero detail')
      );
  }

  gotoCrises() {
    const crisisId = this.crisis ? this.crisis.id : null;
    this.router.navigate(['../', {id: crisisId, foo: 'foo'}], {relativeTo: this.route})
      .then(() => this.messageService.add(`From ${crisisId} back to Crisis Center`));
  }
}
