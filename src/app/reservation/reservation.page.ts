import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular'
import { Validators, FormBuilder, FormGroup } from '@angular/forms'

declare var globalData:any 

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  reservation:FormGroup
  isAndr:boolean
  isIos:boolean
  smokingFlag:boolean = false
  isSmoking:boolean

  constructor(
    private platform : Platform,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder
  ) {

    //check if guest is smoker

    this.isSmoking = this.smokingFlag == true ? true : false 

    //validation block 

    this.reservation = this.formBuilder.group({      
      guest:4,
      smoking:this.isSmoking,
      dateTime : ['', Validators.required]
    })


   }

   public numOfGuests = [
     {
       actualValue : 1,
       displayValue : 'one'
     },
     {
      actualValue : 2,
      displayValue : 'two'

    },
    {
      actualValue : 3,
      displayValue : 'three'

    },
    {
      actualValue : 4,
      displayValue : 'four'

    },
    {
      actualValue : 5,
      displayValue : 'five'

    },
    {
      actualValue : 6,
      displayValue : 'six'

    }
  ]
    

   submitForm(){
     console.log(this.reservation.value)
     this.closeModal()
   }

  closeModal(){
    return this.modalCtrl.dismiss()
  }
  

  ngOnInit() {
    this.isAndr = globalData.isAndr
    this.isIos = globalData.isIos
    
  }

}
