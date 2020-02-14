import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { User } from 'src/shared/user'
import { Storage } from '@ionic/storage'
import { RegisterPage } from '../register/register.page'

declare var globalData:any

const storage_key_user = 'user_key'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login_form:FormGroup 
  user_creds:User = { username : '', password : '' }
  

  constructor(
    private modalCtrl:ModalController,
    private formBuilder:FormBuilder, 
    private storage: Storage
  ) {

    this.login_form = this.formBuilder.group({
      username_check : ['', Validators.required],
      password_check : ['', Validators.required],
      remember_check : [true]
    })
   }

   async openRegister(){
     let modal = await this.modalCtrl.create({
       component: RegisterPage
     })
     return await modal.present()
   }

  closeModal(){
    console.log('close Login modal')
    this.modalCtrl.dismiss()
  }

  onSubmit(){
    console.log('form input info   ', this.login_form.value)
    this.user_creds.username = this.login_form.get('username_check').value
    this.user_creds.password = this.login_form.get('password_check').value
    console.log('User credentials:   ',this.user_creds)

    const user_creds_arr:any = []
    user_creds_arr.push(this.user_creds)

    if(this.login_form.get('remember_check').value)
      this.storage.set(storage_key_user, user_creds_arr)
    else
      this.storage.remove(storage_key_user)
    
      
    this.closeModal()

    this.storage.get(storage_key_user).then(res => globalData.existing_user = res)
  }
 
  ngOnInit() {
  }

}
