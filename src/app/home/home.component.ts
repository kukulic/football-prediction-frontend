import {Component, OnInit} from '@angular/core';
import {TeamService} from '.././_services/teams.service';
import {HttpClient} from "@angular/common/http";
import {CompetitionService} from ".././_services/competition.service";
import {ScheduleService} from ".././_services/schedule.service";
import {PredictionService} from ".././_services/prediction.service";
import {Router} from '@angular/router';
import {User} from "../_models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  competitions: any;
  competitionId: number;
  currentUser: User;

  constructor(private _teamService: TeamService,
              private _competitionService: CompetitionService,
              private _scheduleService: ScheduleService,
              private _predictionService: PredictionService,
              private httpClient: HttpClient,
              private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this._competitionService.getEntryCompetitions(this.currentUser.username).subscribe(val => {
      this.competitions = val
      if (Object.keys(this.competitions).length == 1)
      this.router.navigate(['/prediction', this.competitions[0].id]);
    })


  }

  chooseCompetition(value: number) {
    this.competitionId = value;
    this.router.navigate(['/prediction', this.competitionId]);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }


}
