import { FavoritesComponent } from './pages/favorites/favorites.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ListDinosComponent } from './dino/listdino.component';
import { AnalysisComponent } from './pages/analysis/list-analysis/analysis.component';
import { AnalysisDetailComponent } from './pages/analysis/details/analysisdetail.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'dinosaurs', component: ListDinosComponent },
      { path: 'favorites', component: FavoritesComponent},
      { path: 'analysis', component: AnalysisComponent},
      { path: 'analysis-details/:id', component: AnalysisDetailComponent},
    ]
  },
  { path: '**', redirectTo: 'home' }
];
