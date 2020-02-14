import { Component, OnInit, Inject} from '@angular/core';
import { NavController, ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavouriteService } from '../providers/favourite.service';
import { Storage } from '@ionic/storage';
import { DishCommentsPage } from '../dish-comments/dish-comments.page';
import { DishProvider } from '../providers/dish.service';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


declare var globalData:any; 

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {
  dish:Dish
  errMsg:string 
  avgStars:string 
  numCmts:number 
  dishCommInfo:any
  isFav:boolean 

  constructor(
    private navCtrl:NavController, 
    private storage: Storage,
    private favService:FavouriteService,
    @Inject('BaseURL') private BaseURL, 
    private toastCtrl:ToastController,
    private actionSheetCtrl : ActionSheetController,
    private modalCtrl: ModalController,
    private dishProvider: DishProvider,
    private route:Router,
    private location: Location,
    private localNots: LocalNotifications,
    private social_share:SocialSharing
  ) { 
    this.dish = globalData.dish
    this.numCmts = this.dish.comments.length
    let total = 0 
    this.dish.comments.forEach(comment => total += comment.rating)
    this.avgStars = (total/this.numCmts).toFixed(2)

  }

  favDish(){
    console.log('added to favourites')
    this.favService.addToFav(this.dish.id).then(()=>{
      this.isFav = true
    })

    this.showNewFavDishMsg(this.dish.id)

    //schedule a single notification

    this.localNots.schedule({
      id: this.dish.id,
      text : 'Dish ' + this.dish.id + ' added as a favorite successfully'
    })
  }

  unfavDish(){
    console.log('removed from favourites')

    this.favService.delFromFav(this.dish.id).then(()=>{
      this.isFav = false
    })
  } 

 checkDishStatus(){
    this.favService.isFavourite(this.dish.id).then(favStatus=> this.isFav = favStatus )
    console.log('is favourite?    ', this.isFav)
  }

  async showNewFavDishMsg(__newFavDishId){
    const toast = await this.toastCtrl.create({
      message : 'Dish '+__newFavDishId +' added to fav list',
      duration : 1500,
      position: "middle"
    })
    return await toast.present()
  }

  async openActionSheet(){
    let action = await this.actionSheetCtrl.create({
      header : 'Options',
      buttons : [
        {
          text: 'Add to Favorites',          
          handler : ()=>{
            this.favDish()

          }
        },
        {
          text: 'Add a Comment',
          handler : ()=>{
            this.addFavDishComments()
          }
        },
        {
          text: 'Cancel',
          role:'cancel',
          handler : ()=>{
            console.log('Cancel action sheet ')
          }
        },
        {
          text:'Share via FB',
          handler: ()=>{
            this.social_share.shareViaFacebook(this.dish.name +' -- '+this.dish.description, this.BaseURL+this.dish.image,'')
            .then(()=>{console.log('Posted on FB')})
            .catch(()=>{console.log('Sharing failed...')})
          }
        },
        {
          text:'Share via Twitter',
          handler:()=>{
            this.social_share.shareViaTwitter(this.dish.name+'-- '+this.dish.description, this.BaseURL + this.dish.image, '' )
            .then(()=>{console.log('sharing success...')})
            .catch(()=>{console.log('sharing failed...')})
          }
        }
      ]

    })

    action.present()
  }

  async addFavDishComments(){ 
    let modal = await this.modalCtrl.create({
      component : DishCommentsPage,
    })
    return await modal.present().then(()=>{
      modal.onDidDismiss().then(()=>{
        this.dishCommInfo = globalData.dishCommInfo
        console.log('dish comment info   ',this.dishCommInfo) 
        
        //Check if comment is empty. If not then add new comment to list
        $.isEmptyObject(this.dishCommInfo) ? console.log('Comment cancelled') :  this.addToCommList() 
        
      })
    })
  } 

  addToCommList(){
    this.dish.comments.push(this.dishCommInfo)
    console.log('new comment list', this.dish.comments)

    //check if rating is greater than 1 rating-unit is 'stars' else 'star' 

    var __dishCommInfo = this.dishCommInfo
    
    this.dishCommInfo.rating > 1 ? Object.assign(__dishCommInfo,{ratingUnit : 'stars'}) : Object.assign(__dishCommInfo,{ratingUnit : 'star'})

  }

  onViewInit(){ 

    this.checkDishStatus()

    //total dish comments present 
    console.log('dish comments present :  ', this.dish.comments)

    //add rating unit to reviews - default: "stars"
    var dishComments = this.dish.comments
    for(let j = 0 ; j< dishComments.length; j++ ){
      var __dc = dishComments[j]

    //check if rating is greater than 1 rating-unit is 'stars' else 'star' 
     __dc.rating > 1 ? Object.assign(__dc, {ratingUnit : 'stars'}) : Object.assign(__dc, {ratingUnit : 'star'})

    }
  }

  ngOnInit() {  
    this.onViewInit()   


  }


}
