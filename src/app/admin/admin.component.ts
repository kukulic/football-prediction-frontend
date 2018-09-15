import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {first} from "rxjs/operators";
import {AlertService} from "../_services/alert.service";
import {ResultService} from "../_services/result.service";
import {PredictionService} from "../_services/prediction.service";
import {Match} from "../_models/match";
import {CompetitionService} from "../_services/competition.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  currentUser: User;
  matches: Match[];
  users: User[];
  competitions: any;
  currentMatch: Match;
  username: string;
  competitionId: number;

  constructor(
    private _userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private _predictionService: PredictionService,
    private _resultService: ResultService,
    private _competitionService: CompetitionService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.currentUser.role = null;
    this._userService.getUserRole(this.currentUser.username, this.currentUser.password)
      .subscribe(
        data => {
          this.currentUser.role = data.role;
          if (this.currentUser.role != 'admin') {
            this.alertService.error('User doesn\'t have authorisation for this action');
            this.router.navigate(['/login']);
          }

          this._predictionService.getAllFinishedMatches().subscribe(val => {
            this.matches = val;
          });
        },
        error => {
          this.alertService.error(error);
        });

    this._userService.getAllUsers()
      .subscribe(
        data => {
          this.users = data;
          console.log('useri', this.users);
        }
      )

    this._competitionService.getAllCompetition()
      .subscribe(
        data => {
          this.competitions = data;
          console.log('competition', this.competitions);
        }
      )
  }

  addResult(match: any, team1Goal: number, team2Goal: number) {

    if (team1Goal >= 0 && team2Goal >= 0 && team1Goal != null && team2Goal != null) {
      this.currentMatch = match;
      this.currentMatch.team1GoalsResult= team1Goal;
      this.currentMatch.team2GoalsResult = team2Goal;

      if (this.currentMatch.team1GoalsResult > this.currentMatch.team2GoalsResult)
        this.currentMatch.winnerResult = this.currentMatch.team1;
      if (this.currentMatch.team1GoalsResult < this.currentMatch.team2GoalsResult)
        this.currentMatch.winnerResult = this.currentMatch.team2;
      if (this.currentMatch.team1GoalsResult == this.currentMatch.team2GoalsResult)
        this.currentMatch.winnerResult = 'Draw';

      this._resultService.saveResult(this.currentMatch).subscribe(res => {
        this.ngOnInit();
      });

    }
  }

  chooseUser(value: any) {
    this.username = value;
  }


  chooseCompetition(value: any) {
   this.competitionId = value;
  }


  addUserToCompetition(username: string, competitionId: number) {
    this._competitionService.addUserToCompetition(username, competitionId)
      .subscribe(data => {
        console.log('odgovor', data);
        }
      )
  }


  goToHome() {
    this.router.navigate(['/home']);
  }

}
