import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Match } from '../_models/match';
import {Observable} from "rxjs/internal/Observable";
import {User} from "../_models/user";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable()
export class ResultService {
  currentUser: User;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getHistoryResult(matchId: number) {
    return this.http.get(API_URL + `/result/` + matchId);
  }

  saveResult(match: Match): Observable<Match> {
    var params =
      {
        "matchId": match.matchId,
        "username": this.currentUser.username,
        "team1GoalsResult": match.team1GoalsResult,
        "team2GoalsResult": match.team2GoalsResult,
        "winnerPrediction":  match.winnerPrediction,
        "team1": match.team1,
        "team2": match.team2,
        "matchTime": match.matchTime
      }

    return this.http.post<Match>(API_URL + '/saveResult', params)
  }



}
