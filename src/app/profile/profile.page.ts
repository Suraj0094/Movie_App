import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import {ToastController,NavController} from '@ionic/angular';
import {Router } from '@angular/router';   

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {first_name:'',mobile_number:''};    //To display data of user.

  constructor(public storage:Storage,public toastCtrl:ToastController,public nav:NavController,public router:Router) {

  }

  ngOnInit() {
  }

  /**
   *   Developer : Suraj jadhav
   *   Date: 22 Nov 2019
   *   Purpose : To retrive profile data from localStorage 
   * 
   */

  ionViewWillEnter(){
    this.storage.get('Profile').then(data =>{
       this.user = data;
     }) 
  }

  /**
   *  Purpose : To update user profile data like First Name,Mobile Number
   *  Date : 22 Nov 2019
   *  @param userData contains updated data of user.
   */

  async updateProfile(userData){
     this.storage.set('Profile',userData).then(data =>{
       this.user = data;
      
    })
    let toastMessage = await  this.toastCtrl.create({
      message:'Profile updated successfully',
      position:'middle',
      duration: 2000
    })
    toastMessage.present();
    this.nav.setDirection('root');
    this.router.navigateByUrl('/tabs');
  }

}
