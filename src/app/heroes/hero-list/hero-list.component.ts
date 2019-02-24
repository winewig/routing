import { Component, OnInit } from '@angular/core';

import { Hero } from '../Hero';
import { HeroService } from '../HeroService';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  selectedId: number;
  selectedHero: Hero;

  heroes: Hero[];

  constructor(private route: ActivatedRoute, private heroService: HeroService) { }

  ngOnInit() {
    // this.getHeroes();
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = +params.get('id');
        console.log(`The selected hero ID was: ${this.selectedId}`);
        return this.heroService.getHeroes();
      })
    );
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
