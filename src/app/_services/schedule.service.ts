import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from 'rxjs/operators';
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


class Schedule {

}

@Injectable()
export class ScheduleService {

  constructor(private http:HttpClient) {
  }

  generateSchedule(competitionId: number) {
    let params =
      {
        "id":  competitionId
      }
      console.log('test: ', competitionId);
    return this.http.post(API_URL + '/generateSchedule', params)
  }

}
