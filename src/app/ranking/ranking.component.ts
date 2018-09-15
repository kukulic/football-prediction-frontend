import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Match } from "../_models/match";
import { PredictionService } from "../_services/prediction.service";
import { User } from "../_models/user";
import {RankingService} from "../_services/ranking.service";
import {Rank} from "../_models/rank";

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html'
})
export class RankingComponent implements OnInit {
  competitionId: number;
  ranking: Rank[];
  private sub: any;
  currentUser: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _rankingService: RankingService,
    private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.competitionId = +params['competitionId'];
    });
    this._rankingService.getCompetitionRanking(this.competitionId).subscribe(val => {
      this.ranking = val;
      console.log(this.ranking);
    });
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

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }
}
