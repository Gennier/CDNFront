import { Component, OnInit } from '@angular/core';
import { MainServices } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'etiqa';

  constructor(private authService: MainServices) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
