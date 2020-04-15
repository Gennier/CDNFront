import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbMenuItem} from '@nebular/theme';
import { AdminServices } from '../admin.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  items: NbMenuItem[]  = [
    {
      title: 'Overview',
      icon: 'archive-outline',
      link: 'overview',
    },
    {
      title: 'User',
      icon: 'people-outline',
      link: 'user',
    }
  ];

  click: boolean;

  constructor() { }

  ngOnInit(): void {
    this.click = true;
  }

}
