import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  public message: string;

  constructor(public authService: AuthService, private router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    // Set our navigation extras object
    // that passes on our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };

    this.authService.login().subscribe(
      () => {
        this.setMessage();
        if (this.authService.isLoggedIn) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/crisis-center/admin';

          console.log(redirect);
          // Redirect the user
          this.router.navigate([redirect], navigationExtras);
        }
      }
    );
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
