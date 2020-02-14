import { Component, OnInit, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FavouriteService } from '../providers/favourite.service'
import { Dish } from '../../shared/dish';
import { DishProvider } from '../providers/dish.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular'
import { Button } from 'protractor';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';




declare var globalData:any

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  favList : any[]
  errMsg:string
  

  constructor(
    private storage:Storage,
    private favService:FavouriteService,
    @Inject('BaseURL') private BaseURL ,
    private dishProvider: DishProvider,
    private toastCtrl:ToastController,
    private alertCtrl:AlertController,
    private loadingCtrl: LoadingController,
    private localNots : LocalNotifications

  ) {
    
    
   }


  dispFavDishes(){
    
    this.favService.getAllFavDishes().then(res => this.favList = res)

    console.log('favlist info   ',this.favList)    

  }

  removeDish(__favDishId){   

    console.log("deleted dish id   ",__favDishId)

    this.favService.delFromFavlist(__favDishId).then(res => this.favList = res )

    console.log('favlist after removing item: ', this.favList)

  }

  async showAlertBeforeDltDish(__deletedDishId){

    console.log('show alert ')

    const alert = await this.alertCtrl.create({
      header : 'Confirm Delete', 
      message: 'Do you want to delete Dish '+ __deletedDishId,
      buttons: [{
        text : 'Cancel', 
        role: 'cancel', //role is an optional property , it fires the button's handler function on clicking the backdrop.
        handler : ()=>{
          console.log('Delete cancelled')
        }
      }, 
      {
        text : 'Delete', 
        handler :  async ()=>{          

          let loader = await this.loadingCtrl.create({
            message : 'Deleting...'
          }) 

          loader.present()

          this.removeDish(__deletedDishId)

          loader.dismiss()

          this.showDishDeletedMsg(__deletedDishId)
          
        }

      }
    ]
    })

    return await alert.present()
  }


  async showDishDeletedMsg(__deletedDishId){
    const toast = await this.toastCtrl.create({
      message : 'Dish '+ __deletedDishId +' deleted successfully',
      duration: 1500
    })

    return await toast.present()
  }


  emptyList(){
    this.favService.getAllFavDishes().then(res=>{
      if(!res.length){
        this.errMsg = 'No Dish Available'
      }
    })
  }

  onViewInit(){

    this.dispFavDishes()
    this.emptyList()

  }

  getNotification(){
    //test notification

    this.localNots.schedule({
      text: 'test notification...'
    })
  }

  ngOnInit() {
    this.onViewInit()
    this.getNotification()
    
    
  }

}
