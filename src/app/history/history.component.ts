import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Match } from "../_models/match";
import { PredictionService } from "../_services/prediction.service";
import { User } from "../_models/user";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {
  competitionId: number;
  matches: Match[];
  private sub: any;
  currentUser: User;
  countedScore: Match;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _predictionService: PredictionService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.competitionId = +params['competitionId'];
    });

    this._predictionService.getAllHistoryMatches(this.competitionId, this.currentUser.username).subscribe(val => {
      this.matches = this.calculateScore(val);
    })
  }

  calculateScore(matchList: Match[]) {
    let score = 0;
    this.countedScore = new Match();

    for (let match of matchList) {
      score = score + match.userScore;
    }

    this.countedScore.userScore = score;
    matchList.push(this.countedScore);

    return matchList;
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  goToPrediction(competitionId: number) {
    this.router.navigate(['/prediction', competitionId]);
  }

  goToHistory(competitionId: number) {
    this.router.navigate(['/history', competitionId]);
  }

  goToRanking(competitionId: number) {
    this.router.navigate(['/ranking', competitionId]);
  }

}
