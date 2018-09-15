import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { PredictionComponent } from './prediction/prediction.component';
import { HomeComponent} from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminComponent } from "./admin/admin.component";
import { RankingComponent } from "./ranking/ranking.component";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'history/:competitionId', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'prediction/:competitionId', component: PredictionComponent, canActivate: [AuthGuard] },
  { path: 'ranking/:competitionId', component: RankingComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);

