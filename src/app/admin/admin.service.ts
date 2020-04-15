import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { GetFreelanceModel } from './models/getFreelanceModel';
import { PostFreelanceModel } from './models/postFreelanceModel';
import { PutFreelanceModel } from './models/putFreelanceModel';

import { GetOverviewLatestModel } from './models/getOverviewLatestModel';
import { GetSkillsModel } from './models/getSkillsModel';
import { GetHireModel } from './models/getHireModel';

@Injectable({
    providedIn: 'root'
})
export class AdminServices {

  constructor(private http: HttpClient) { }

  baseurl = `${environment.apiBaseUrl}`;

  addFreelance(data: PostFreelanceModel) {
    return this.http.post<GetFreelanceModel[]>(this.baseurl + 'freelance', data);
  }

  getFreelanceList() {
    return this.http.get<GetFreelanceModel[]>(this.baseurl + 'freelance');
  }

  updateFreelance(data: PutFreelanceModel) {
    return this.http.put(this.baseurl + 'freelance', data);
  }

  hireFreelance(data: string) {
    return this.http.put(this.baseurl + 'freelance/hire', {id: data});
  }

  deleteFreelance(id: string) {
    return this.http.delete<GetFreelanceModel[]>(this.baseurl + 'freelance/' + id);
  }

  getLatest() {
    return this.http.get<GetOverviewLatestModel[]>(this.baseurl + 'overview/latest');
  }

  getSkills() {
    return this.http.get<GetSkillsModel>(this.baseurl + 'overview/skills');
  }

  getHired() {
    return this.http.get<GetHireModel>(this.baseurl + 'overview/hire');
  }
}
