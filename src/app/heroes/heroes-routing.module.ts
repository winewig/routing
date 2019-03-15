import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroListComponent} from './hero-list/hero-list.component';

const heroesRoutes: Routes = [
  // before migrating URLs with Redirects
  // { path: 'heroes',  component: HeroListComponent, data: {animation: 'heroes'} },
  // { path: 'hero/:id', component: HeroDetailComponent, data: {animation: 'hero'} }
  {path: 'heroes', redirectTo: './superheroes'},
  {path: 'hero/:id', redirectTo: 'superhero/:id'},
  {path: 'superheroes', component: HeroListComponent, data: {animation: 'heroes'}},
  {path: 'superhero/:id', component: HeroDetailComponent, data: {animation: 'hero'}}
];

@NgModule({
  imports: [RouterModule.forChild(heroesRoutes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
