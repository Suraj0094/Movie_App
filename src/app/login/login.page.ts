import { NavController,MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page';
import { Storage } from '@ionic/storage'; 
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  loginForm:FormGroup;
  user = {first_name:'',mobile_number:''} ;                          //Temporarily stores data of User

  constructor(public router:Router,
              public nav:NavController,
              public menu:MenuController,
              public storage:Storage,
              public formBuilder:FormBuilder)
  {
     this.menu.swipeEnable(false);     // Disables side menu page 
     let numberOnly = /^[5-9]\d{9}$/;
   
     this.loginForm = this.formBuilder.group({
        first_name:['',Validators.required],
        last_name:['',Validators.required],
     }) 
    
  }

 
  /**
   * Developer : Suraj Jadhav
   * Date : 19 Nov 2019
   * Purpose -Saves users data when he opens App first time.
   *         -Generates unique authentication key.
   *         -After successful login it redirects to home page.
   * 
   * @param userData of user - First Name, Last Name .
   */

  submit(userData){
    var unique_key = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";  
    for (var i = 0; i < 15; i++) {
      unique_key += possible.charAt(Math.floor(Math.random() * possible.length));  
    }

    localStorage.setItem('authentication_key',unique_key);
   
    this.storage.set('Profile',userData);
    
    this.nav.setDirection('root');
    this.router.navigateByUrl('/tabs');
  }

}
