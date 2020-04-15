import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServices } from '../main.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userIsAuthenticated = false;

  email: string;
  password: string;

  error: boolean;

  constructor(
    private router: Router,
    private mainService: MainServices,
  ) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.mainService.getIsAuth();
    if (this.userIsAuthenticated) {
      this.router.navigate(['/admin/overview']);
    }

    this.email = null;
    this.password = null;
    this.error = false;
  }

  login() {

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.mainService.login(loginData).pipe(
      take(1)
    )
    .subscribe(data => {
      if (data.token) {
        console.log(data.token);
        this.mainService.saveAuthData(data.token);
        this.router.navigate(['/admin/overview']);
      }
    }, error => {
      if (error.status === 401) {
        this.error = true;
      }
    });
  }
}
