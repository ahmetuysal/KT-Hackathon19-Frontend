import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateFundraisingComponent } from './create-fundraising/create-fundraising.component';
import { CreateEquityFundingComponent } from './create-equity-funding/create-equity-funding.component';
import { HomeResolveGuard } from './home-resolve.guard';
import { KtRedirectGuard } from './kt-redirect.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { data: HomeResolveGuard } },
  { path: 'create-fundraiser', component: CreateFundraisingComponent },
  { path: 'create-equity-funding', component: CreateEquityFundingComponent },
  { path: 'logincompleted', component: HomeComponent, canActivate: [KtRedirectGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
