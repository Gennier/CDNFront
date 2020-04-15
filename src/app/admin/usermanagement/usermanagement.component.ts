import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AdminServices } from '../admin.service';

import { GetFreelanceModel } from '../models/getFreelanceModel';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class UsermanagementComponent implements OnInit {

  columnsToDisplay: string[] = ['fullname', 'email', 'phone', 'price', 'action'];
  expandedElement: GetFreelanceModel | null;
  freelanceList: GetFreelanceModel[];
  dataSource = new MatTableDataSource(this.freelanceList);

  edit: boolean;

  id: string;
  fullname: string;
  email: string;
  phone: string;
  skillsets: string[];
  hobby: string;
  price1: number;
  price2: number;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private adminServices: AdminServices,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.skillsets = [];
    this.freelanceList = [];
    this.edit = false;

    this.getUserList();
  }

  getUserList() {
    this.adminServices.getFreelanceList().pipe(
      take(1)
    ).subscribe(data => {
      this.freelanceList = data;
      this.assignDatasource();
    });
  }

  addUser() {

    const freelanceData = {
      fullname: this.fullname,
      email: this.email,
      phone: this.phone,
      skillsets: this.skillsets,
      hobby: this.hobby,
      price1: this.price1,
      price2: this.price2
    };

    this.adminServices.addFreelance(freelanceData).pipe(
      take(1)
    ).subscribe(data => {
      this.snackBar.open('Freelance added', 'close', {
        duration: 2000,
      });
      this.freelanceList = data;
      this.assignDatasource();
      this.empty();
    }, error => {
      if (error.status === 400) {
        this.snackBar.open('Error, Freelance already exist', 'close', {
          duration: 4000,
        });
      }
    });

  }

  updateUser() {
    const freelanceData = {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
      phone: this.phone,
      skillsets: this.skillsets,
      hobby: this.hobby,
      price1: this.price1,
      price2: this.price2
    };

    this.adminServices.updateFreelance(freelanceData).pipe(
      take(1)
    ).subscribe(data => {
      this.snackBar.open('Freelance updated', 'close', {
        duration: 4000,
      });
      this.empty();
      this.getUserList();
    }, error => {
      if (error.status === 400) {
        this.snackBar.open('Error, Something went wrong', 'close', {
          duration: 4000,
        });
      }
    });
  }

  editUser(freelance: GetFreelanceModel) {
    this.edit = true;
    this.id = freelance.id;
    this.fullname = freelance.fullname;
    this.email = freelance.email;
    this.phone = freelance.phone;
    this.skillsets = freelance.skillsets;
    this.hobby = freelance.hobby;
    this.price1 = freelance.price1;
    this.price2 = freelance.price2;
  }

  deleteUser(id: string) {
    this.adminServices.deleteFreelance(id).pipe(
      take(1)
    ).subscribe(data => {
      this.snackBar.open('Freelance deleted', 'close', {
        duration: 4000,
      });
      this.freelanceList = data;
      this.assignDatasource();
      this.empty();
    }, error => {
      if (error.status === 400) {
        this.snackBar.open('Error, Something went wrong', 'close', {
          duration: 4000,
        });
      }
    });
  }

  hireUser(id: string) {
    this.adminServices.hireFreelance(id).pipe(
      take(1)
    ).subscribe(data => {

      this.getUserList();
    }, error => {
      if (error.status === 400) {
        this.snackBar.open('Error, Something went wrong', 'close', {
          duration: 4000,
        });
      }
    });
  }

  assignDatasource() {
    this.dataSource = new MatTableDataSource(this.freelanceList);
  }


  empty() {
    this.fullname = null;
    this.email = null;
    this.phone = null;
    this.skillsets = [];
    this.hobby = null;
    this.price1 = null;
    this.price2 = null;
  }

  cancel() {
    this.edit = false;
    this.empty();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const data = value.trim();
      this.skillsets.push(data);
    }

    if (input) {
      input.value = '';
    }
  }

  removeChip(skill: string): void {
    const index = this.skillsets.indexOf(skill);

    if (index >= 0) {
      this.skillsets.splice(index, 1);
    }
  }

}

export interface Fruit {
  name: string;
}
