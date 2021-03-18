import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoteComponent } from './vote/vote.component';
import { RoomComponent } from './room.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: RoomComponent
}, {
  path: ':roomid/vote/:userid',
  component: VoteComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
