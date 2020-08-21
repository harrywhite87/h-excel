import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { FunctionsComponent } from './views/functions/functions.component';
import { TemplatesComponent } from './views/templates/templates.component';
import { TestComponent } from './views/test/test.component';
import { TipsComponent } from './views/tips/tips.component';
import { TrainingComponent } from './views/training/training.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'functions', component: FunctionsComponent },
  { path: 'functions/:id', component: FunctionsComponent },

  { path: 'templates', component: TemplatesComponent },
  { path: 'tips', component: TipsComponent },
  { path: 'test', component: TestComponent },
  { path: 'training', component: TrainingComponent },
  { path: '', redirectTo: '/functions', pathMatch: 'full' },
];

// { path: 'dashboard/:state', component: DashboardComponent },


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
