import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DishCommentsPageRoutingModule } from './dish-comments-routing.module';

import { DishCommentsPage } from './dish-comments.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DishCommentsPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [DishCommentsPage]
})
export class DishCommentsPageModule {}
