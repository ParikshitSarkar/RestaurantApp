import { Component, OnInit } from '@angular/core'
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { ModalController } from '@ionic/angular'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  register_form:FormGroup
  image:string = 'assets/images/logo.png'

  constructor(
    private formBuilder:FormBuilder,
    private modalCtrl:ModalController,
    private cam:Camera,
    private file:File
  ) {

    this.register_form = this.formBuilder.group({
      first_name : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]], 
      last_name : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      username : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      password : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      tel_num : ['', [Validators.required, Validators.pattern('[0-9]*')]],
      email : ['', [Validators.required, Validators.email]]
    })
   }

   dismissModal(){
     //dismiss top-overlay
    this.modalCtrl.dismiss()
   }

   submitForm(){
     console.log(this.register_form.value)
     this.dismissModal()
   }

   dispPicture(){
    let option : CameraOptions = {
      quality: 100, 
      targetHeight : 100, 
      targetWidth : 100, 
      correctOrientation : true, 
      allowEdit : true, 
      destinationType: this.cam.DestinationType.FILE_URI,
      encodingType : this.cam.EncodingType.PNG,
      mediaType : this.cam.MediaType.PICTURE,
      cameraDirection: this.cam.Direction.FRONT
    }
    this.cam.getPicture(option).then((__imgData)=>{
      // imageData is a file URI
      this.image = __imgData
    }).catch((err)=>{
      console.log('Error obtaining picture    ', err)
    })
   }

   dispFromLibrary() {
     console.log('display pics from lib')

     const options: CameraOptions = {
      quality: 100,
      sourceType: this.cam.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.cam.DestinationType.FILE_URI,
      encodingType: this.cam.EncodingType.JPEG,
      mediaType: this.cam.MediaType.PICTURE
    }

    this.cam.getPicture(options).then(__imgData=>{
      console.log('open img lib')
      this.image = __imgData
    }).catch(err=>{console.log('Err msg:  ', err)})

   }

  ngOnInit() {
  }

}
