import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from 'rxjs/operators';
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


class Team {

}

@Injectable()
export class TeamService {

  constructor(private http:HttpClient) {
  }

  getTeams(category: string): Observable<any> {
    var params =
      {
        "category": category
      }
    return this.http.get(API_URL + '/getAllTeams', {params: params})
  }

}
