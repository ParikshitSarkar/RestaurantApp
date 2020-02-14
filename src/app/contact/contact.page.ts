import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(
    private email_comp:EmailComposer,
    private call_num:CallNumber
  ) { }

  ngOnInit() {
  }

  sendEmail(){
    console.log('send email')
    let email = {
      to:'confusion@food.net',
      subject:'[ConFusion]: Query',
      body: 'Dear Sir/Madam:  This is a test email...',
      isHtml:true
    }

    this.email_comp.open(email)
  }

  callRestaurant() {
     console.log('initiate call')
    /*this.call_num.callNumber('18001010101',true)
    .then(res => { console.log('Launched dialer!  ', res)})
    .catch(err => { console.log('Error launching dialer... ', err)}) */

    //launch dialer using InAppBrowser
    let tel_number = '9870684933'
    window.open(`tel:${tel_number}`, '_system')
  }

}
