import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Crisis } from './crisis';
import { CRISES } from './mock-crises';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class CrisisService {
  static nextCrisisId = 100;
  private crises$$: BehaviorSubject<Crisis[]> = new BehaviorSubject<Crisis[]>(CRISES);

  constructor(private messageService: MessageService) { }

  public getCrises() {
    return this.crises$$;
  }

  public getCrisis(id: number | string) {
    return this.getCrises().pipe(
      // (+) before `id` turns the string into a number
      map(crises => crises.find(crisis => crisis.id === +id))
    );
  }

  public addCrisis(name: string) {
    const _name = name.trim();
    if (_name) {
      const crisis = {
        id: CrisisService.nextCrisisId++,
        name: _name
      };
      CRISES.push(crisis);
      this.crises$$.next(CRISES);
    }
  }

}
