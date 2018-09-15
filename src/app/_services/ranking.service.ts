import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/internal/Observable";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class RankingService {

  constructor(private http: HttpClient) {
  }

  getCompetitionRanking(competitionId: any): Observable<any> {
    var params =
      {
        "competitionId": competitionId
      }
    return this.http.get(API_URL + '/getCompetitionRanking', {params: params})
  }

}
