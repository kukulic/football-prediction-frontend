import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from 'rxjs/operators';
import {environment} from "../../environments/environment";


const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class CompetitionService {

  constructor(private http:HttpClient) {

  }


  getCompetitions(): Observable<any> {
    return this.http.get(API_URL + '/getCompetitionCategory')
  }

  getCompetitionByYear(category: string): Observable<any> {
    var params =
      {
        "category": category
      }
    return this.http.get(API_URL + '/getAllCompetition', {params: params})
  }

  getEntryCompetitions(username: any): Observable<any> {
    var params =
      {
        "username": username
      }
    return this.http.get(API_URL + '/getEntryCompetitions', {params: params})
  }

  getAllCompetition(): Observable<any> {
    return this.http.get(API_URL + '/getAllPossibleCompetition')
  }

  addUserToCompetition(username: string, competitionId: number) {
    var params =
      {
        "username": username,
        "competitionId": competitionId
      }
    return this.http.post(API_URL + '/addUserToCompetition', params, {responseType: 'text'})
  }


}
