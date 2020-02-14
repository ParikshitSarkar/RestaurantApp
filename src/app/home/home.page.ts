import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../providers/dish.service';
import { Promotion } from '../../shared/promotion';
import { PromotionProvider } from '../providers/promotion.service';
import { Leader } from '../../shared/leader';
import { LeaderProvider } from '../providers/leader.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage'
declare var globalData:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dish:Dish
  dishErrMess:string
  promotion:Promotion
  promoErrMess:string
  leader:Leader
  leaderErrMess:string
  

  constructor(public navCtrl: NavController,
   private dishservice:DishProvider,
   private promotionservice:PromotionProvider,
   private leaderservice: LeaderProvider,
   @Inject('BaseURL') private BaseURL,
   private iab: InAppBrowser,
   private storage:Storage
   ) { }

   openURL(__link){
    /* if(__link == 'mail'){
      let browser = this.iab.create('https://www.google.com/intl/en-GB/gmail/about/#','_blank')
      browser.show()
      console.log('open mail')
     }else if(__link == 'youtube'){
      let browser = this.iab.create('https://www.youtube.com/','_blank')
      browser.show()
      console.log('open youtube')
     }else if(__link == 'twitter') {
      let browser = this.iab.create('https://twitter.com/login','_blank')
      browser.show()
      console.log('open twitter')
    }else if(__link == 'facebook') {
      let browser = this.iab.create('https://www.facebook.com/','_blank')
      browser.show()
      console.log('open facebook')
    }else if(__link == 'linkedin') {
      let browser = this.iab.create('https://in.linkedin.com/','_blank')
      browser.show()
      console.log('open linkedin')
    }   */ 

    switch(__link){
      case 'mail':       
      var browser = this.iab.create('https://www.google.com/intl/en-GB/gmail/about/#','_blank')
      browser.show()

      case 'youtube':
      var browser = this.iab.create('https://www.youtube.com/','_blank')
      browser.show()

      case 'twitter': 
      var browser = this.iab.create('https://twitter.com/login','_blank')
      browser.show()

      case 'facebook':
      var browser = this.iab.create('https://www.facebook.com/','_blank')
      browser.show()

      case 'linkedin':
      var browser = this.iab.create('https://in.linkedin.com/','_blank')
      browser.show()
      
    }
   }

   pageEntry(){
     

    this.dishservice.getFeaturedDish()
      .subscribe(dish=> this.dish = dish ,
                 errMess => this.dishErrMess = errMess     
      );
      this.promotionservice.getFeaturedPromotion()
      .subscribe(promotion=> this.promotion = promotion ,
                 errMess => this.promoErrMess = errMess     
      );
      this.leaderservice.getFeaturedLeader()
      .subscribe(leader=> this.leader = leader ,
                 errMess => this.leaderErrMess = errMess     
      )

   }
   
    ngOnInit(){
      this.pageEntry()

    }

}