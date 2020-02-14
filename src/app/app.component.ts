import { Component } from '@angular/core'

import { Platform, ModalController, LoadingController } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { ReservationPage } from '../app/reservation/reservation.page'

import { FavouriteService } from '../app/providers/favourite.service'

import { LoginPage } from '../app/login/login.page'
import { Storage } from '@ionic/storage'
import { Network } from '@ionic-native/network/ngx'
import { async } from '@angular/core/testing'


declare var globalData:any

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  loader:HTMLIonLoadingElement 

  public appPages = [
    {
      title: 'Login',
      icon: 'log-in'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'ios-information-circle-outline'
    },
    {
      title: 'Contact',
      url: '/contact',
      icon: 'contact'
    },
    {
      title: 'Menu',
      url: '/menu',
      icon: 'menu'
    },
    {
      title: 'Favourites',
      url: '/favourites',
      icon: 'md-heart'
    }
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl:ModalController,
    private favService: FavouriteService,
    private storage:Storage,
    private network:Network,
    private loadingCtrl:LoadingController
  ) {
    this.initializeApp();
   
  }

  openPage(__page){
    console.log('page details:   ',__page )

    if(__page.title == 'Login'){
      console.log('open login modal')
      this.openLogin()
    }
  }

  async openLogin(){
    let modal = await this.modalCtrl.create({
      component : LoginPage
    })
    return await modal.present().then(()=>{
      modal.onDidDismiss().then(()=>{

        let existing_user:any = []

        existing_user = globalData.existing_user

        for(let val of existing_user){
          globalData.existing_username = val.username
          console.log('existing user  : ', globalData.existing_username)
        }

      })
      
    })
  }

 

  async openReserve(){
    const modal = await this.modalCtrl.create({
      component : ReservationPage
    })
    return await modal.present()
  }

  

  checkPfm(){
    console.log('initiate platform  check  ' )

    if(this.platform.is('ios')){
      console.log('platform = ios?  ', this.platform.is('ios'))
      globalData.isIos = true 
      globalData.isAndr = false
    }else{
      console.log('platform = android?  ', this.platform.is('android'))

      globalData.isAndr = true
      globalData.isIos = false 
    }

    /*if(this.platform.is('ios').valueOf()){
      globalData.isIos = true 

      console.log('ios? ',this.platform.is('ios').valueOf())

    }    
    if(this.platform.is('android').valueOf()){
      globalData.isAndr = true
      console.log('android? ',this.platform.is('android').valueOf())
    }*/

    
  }


  initializeApp() {
    this.platform.ready().then(() => {

      this.network.onDisconnect().subscribe(async ()=>{
        this.loader =  await this.loadingCtrl.create({
          message : "Network disconnected..."
        })
        this.loader.present()
      })

      this.network.onConnect().subscribe(()=>{
        setTimeout(()=>{
          if(this.network.type == 'wifi'){
            console.log('We are connected to the internet!')
          }

          //check if loader is present
          if(this.loader){
            this.loader.dismiss()
            this.loader = null
            console.log('Dismiss loader')
          }  
          
        },3000)
                
      })

      this.favService.getAllFavDishes()

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });

    this.checkPfm()
  }
  
}
