import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DishCommentsPage } from './dish-comments.page';

const routes: Routes = [
  {
    path: '',
    component: DishCommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DishCommentsPageRoutingModule {}
