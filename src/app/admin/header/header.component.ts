import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MainServices } from '../../main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() compactMenu = new EventEmitter<boolean>();

  constructor(
    private mainService: MainServices
  ) { }

  ngOnInit(): void {
  }

  compact() {
    this.compactMenu.emit(true);
  }

  logout() {
    this.mainService.logout();
  }
}
