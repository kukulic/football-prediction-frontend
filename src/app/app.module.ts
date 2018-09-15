import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { routing } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { PredictionComponent } from './prediction/prediction.component';
import { HomeComponent } from "./home/home.component";
import { AlertComponent } from "./_directives/alert.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AdminComponent } from "./admin/admin.component";

import { CompetitionService } from "./_services/competition.service";
import { ScheduleService } from "./_services/schedule.service";
import { PredictionService } from "./_services/prediction.service";
import { TeamService } from './_services/teams.service';
import { AlertService } from "./_services/alert.service";
import { AuthGuard } from "./_guards/auth.guard";
import { AuthenticationService } from "./_services/authentication.service";
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor} from "./_helpers/error.interceptor";
import { UserService } from "./_services/user.service";
import { DataTableModule } from "angular-6-datatable";
import { ResultService } from "./_services/result.service";
import { RankingComponent } from "./ranking/ranking.component";
import {RankingService} from "./_services/ranking.service";



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    DataTableModule
  ],
  declarations: [
    AppComponent,
    PredictionComponent,
    HistoryComponent,
    HomeComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    RankingComponent
  ],
  providers: [
    TeamService,
    CompetitionService,
    ScheduleService,
    PredictionService,
    ResultService,
    AlertService,
    AuthGuard,
    AuthenticationService,
    UserService,
    RankingService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
