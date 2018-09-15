import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {map} from 'rxjs/operators';
import {Match} from "../_models/match";
import {User} from "../_models/user";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class PredictionService {    
  currentUser: User;

  constructor(private http: HttpClient) {
  }

  getAllAvailableMatches(competitionId: any, username: string): Observable<any> {
    var params =
      {
        "competition_id": competitionId,
        "username": username
      }
    return this.http.get(API_URL + '/getAllAvailableMatches', {params: params})
  }

  getAllFinishedMatches(): Observable<any> {

    return this.http.get(API_URL + '/getAllFinishedMatches')
  }

  getAllHistoryMatches(competitionId: any, username: string): Observable<any> {
    var params =
      {
        "competition_id": competitionId,
        "username": username
      }
    return this.http.get(API_URL + '/getAllHistoryMatches', {params: params})
  }

  savePredicition(match: Match): Observable<Match> {
    var params =
      {
        "matchId": match.matchId,
        "username": match.username,
        "team1GoalsPrediction": match.team1GoalsPrediction,
        "team2GoalsPrediction": match.team2GoalsPrediction,
        "winnerPrediction":  match.winnerPrediction,
        "team1": match.team1,
        "team2": match.team2,
        "matchTime": match.matchTime
      }

    return this.http.post<Match>(API_URL + '/savePrediction', params)
  }
}
