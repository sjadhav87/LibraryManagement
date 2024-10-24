import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
    
  authRequest:AuthenticationRequest = { email:'', password:'' };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) { }

  login() : void {
    this.errorMsg = [];
this.authService.authenticate({
      body: this.authRequest 
    }).subscribe({
      next: response => {
        this.tokenService.token = response.token as string;
        this.router.navigate(['books']);
      },
      error: (err: any) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
      }
    });
  }

    register() : void {
      this.router.navigate(['register']);
    }
  }

  

