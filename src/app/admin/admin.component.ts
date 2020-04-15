import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { MainServices } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  private menuListenerSubs: Subscription;

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private router: Router,
    private mainService: MainServices,
    private sidebarService: NbSidebarService
  ) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.mainService.getIsAuth();
    this.authListenerSubs = this.mainService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        if (this.userIsAuthenticated === false) {
          this.router.navigate(['']);
        }
    });

  }

  toggleCompact($event) {
    this.sidebarService.toggle($event, 'compact');
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
