import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {HeroService} from '../HeroService';
import { Hero } from '../Hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {


  @Input() hero: Hero;
  private hero$: Observable<Hero>;

  constructor(private route: ActivatedRoute, private router: Router, private service: HeroService) { }

  ngOnInit() {
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(`Hero detail gets the route param: ${params.keys}`);
        return this.service.getHero(params.get('id'));
      })
    );
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    this.router.navigate(['/superheroes', {id: heroId, foo: 'foo'}])
      .then( () =>
        console.log('Back to Heroes from hero detail')
      );
  }
}
