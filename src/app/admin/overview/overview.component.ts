import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { take } from 'rxjs/operators';

import { AdminServices } from '../admin.service';

import { GetFreelanceModel } from '../models/getFreelanceModel';
import { SkillsModel } from '../models/skillsModel';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  doughnutChartType: ChartType = 'doughnut';

  doughnutChartLabels: Label[];
  doughnutChartData: MultiDataSet;
  doughnutChartColors: Array<any> = [
    { backgroundColor:
      ['#01dd93',
      '#4ce7b3',
      '#99f1d3',
      '#01dd23',
      '#4c47b3',
      '#99f1h3',
      '#08dd13',
      '#4qe7b3',
      '#99fgd3',
      '#01gd93',
      '#45e7b3',
      '#99f6f3'],
      borderColor: 'transparent' } ];

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  freelanceLatestList: GetFreelanceModel[];
  freelanceSkillList: SkillsModel[];

  totalFreelance: number;
  hiredFreelance: number;
  unhiredFreelance: number;

  constructor(
    private adminServices: AdminServices
  ) { }

  ngOnInit(): void {
    this.totalFreelance = 0;
    this.hiredFreelance = 0;
    this.unhiredFreelance = 0;
    this.doughnutChartLabels = ['1', '2', '3'];
    this.doughnutChartData = [[1, 2, 3]];
    this.freelanceLatestList = [];
    this.freelanceSkillList = [];

    this.getDoughnutChart();
    this.getLatestList();
    this.getHire();

  }


  getDoughnutChart() {
    this.adminServices.getSkills().pipe(
      take(1)
    ).subscribe(data => {
      this.doughnutChartData = [data.count];
      this.doughnutChartLabels = data.skill;
      this.freelanceSkillList = data.object;
    });
  }

  getLatestList() {
    this.adminServices.getLatest().pipe(
      take(1)
    ).subscribe(data => {
      this.freelanceLatestList = data;
    });
  }

  getHire() {
    this.adminServices.getHired().pipe(
      take(1)
    ).subscribe(data => {
      this.totalFreelance = data.all;
      this.hiredFreelance = data.hire;
      this.unhiredFreelance = data.all - data.hire;
    });
  }


}
