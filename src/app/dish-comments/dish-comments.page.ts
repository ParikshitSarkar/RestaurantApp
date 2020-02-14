import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { DishProvider } from '../providers/dish.service'
import * as moment from 'moment'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { from } from 'rxjs';
import { NavController } from '@ionic/angular'

declare var globalData:any

@Component({
  selector: 'app-dish-comments',
  templateUrl: './dish-comments.page.html',
  styleUrls: ['./dish-comments.page.scss'],
})
export class DishCommentsPage implements OnInit {

  dishComments:FormGroup
  isAndr:boolean
  isIos:boolean

  constructor(
    private modalCtrl:ModalController,
    private formBuilder:FormBuilder,
    private dishProvider:DishProvider,
    private route : Router,
    private location:Location,
    private navCtrl: NavController
  ) { 

    this.dishComments = this.formBuilder.group({
      rating : ['', Validators.required],
      comment : ['', Validators.required],
      author : ['', Validators.required],
      date : [moment().format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ")]
    })

  }

  closeModal(){
    return this.modalCtrl.dismiss()
  }

  submitDishComment(){

    globalData.dishCommInfo = this.dishComments.value

    console.log('dish comment form info:   ',globalData.dishCommInfo)

    this.closeModal()   

  }


  ngOnInit() {
    this.isAndr = globalData.isAndr
    this.isIos = globalData.isIos
  }


}
