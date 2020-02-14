import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'
import { Dish } from '../../shared/dish'
import { Observable } from 'rxjs/Observable'
import { DishProvider } from '../providers/dish.service'

declare var globalData: any


const Storage_Key = 'FavouriteDishes'

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  favourites = []
  AllDishes: Dish[]

  constructor(
    private storage: Storage,
    private dishProvider: DishProvider

  ) {
    console.log('Enter FavoriteProvider ')

    this.dishProvider.getDishes().subscribe(
      res => this.AllDishes = res
    )

  }

  async getAllFavDishes() {

    console.log('return all fav dishes : ', globalData.favDishes)

    return await this.storage.get(Storage_Key).then(res => globalData.favDishes = res)

  }

  async isFavourite(__dishId) {
    return this.getAllFavDishes().then(res => {

      var __arr = res

      for (let i = 0; i < __arr.length; i++) {
        if (__arr[i].id === __dishId) {
          return true
        }
      }
    })

  }

  async addToFav(__dishId) {

    for (let i = 0; i < this.AllDishes.length; i++) {
      var d = this.AllDishes[i].id
      if (d == __dishId) {
        this.favourites.push(this.AllDishes[i])
      }
      this.storage.set(Storage_Key, this.favourites)
    }
  }

  async delFromFav(__dishId) {
    //on removing items from details page 

    return this.getAllFavDishes().then(res => {
      if (res) {
        var index = res.indexOf(__dishId)
        res.splice(index, 1)
        return this.storage.set(Storage_Key, res)
      }
    })
  }

  async delFromFavlist(__dishId) {

    //on removing items from fav page
      for(let j = 0 ; j < this.favourites.length; j++){
        var __d = this.favourites[j].id
        if(__d == __dishId){          

          var index = this.favourites.indexOf(this.favourites[j])
          this.favourites.splice(index,1)
          return this.storage.set(Storage_Key, this.favourites)

        }
      }
  }



}
