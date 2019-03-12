import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so can redirect after logging in
  public redirectUrl: string;

  public login(): Observable<boolean>  {
    return of(true).pipe(
      delay(1000),
      tap( () => this.isLoggedIn = true)
    );
  }

  public logout(): void {
    this.isLoggedIn = false;
  }


  constructor() { }
}
