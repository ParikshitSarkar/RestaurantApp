import { Component, OnInit, Inject } from '@angular/core'
import { NavController } from '@ionic/angular'
import { Dish } from '../../shared/dish'
import { DishProvider } from '../providers/dish.service'
import { baseURL } from 'src/shared/baseurl'


declare var globalData:any;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes:Dish[]
  errMsg:string 

  constructor(
    private navCtrl:NavController, 
    private dishProvider:DishProvider, 
    @Inject('BaseURL') private BaseURL,
    ) 
    {

    }

   
    

  ngOnInit() {

    this.dishProvider.getDishes().subscribe(
      dishes => this.dishes = dishes,
      err => this.errMsg = err
    )


  }

  dishSelected(__dish){
    globalData.dish = __dish
    console.log('selected dish   ',globalData.dish.name)
    this.navCtrl.navigateForward('/dishdetail/'+globalData.dish.id)

  }
}
