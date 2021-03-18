import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/room',
    pathMatch: 'full',
  },
   {
    path: 'room',
    loadChildren: () => import('./room/room.module').then((mod) => mod.RoomModule),
  }, {
    path: 'invalid',
    loadChildren: () => import('./invalid/invalid.module').then((mod) => mod.InvalidModule),
  },
  {
    path: '**',
    redirectTo: 'invalid',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
