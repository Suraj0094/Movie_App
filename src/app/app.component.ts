import { Component } from '@angular/core';
import { Platform, NavController,MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage'; 
import {Router } from '@angular/router';   
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  hideMenu:boolean = false;      //To hide side menu
  constructor(
    private platform: Platform,private splashScreen: SplashScreen,private statusBar: StatusBar,
    public storage:Storage,public router:Router,public nav:NavController,public menu:MenuController
  ) {
    
    let mov = [{name:'Tanaji - The Warrior',year:'2019',type:'Hindi',id:1},{name:'Bajirao Mastani',year:'2016',type:'Hindi',id:2},{name:'Singham',year:'2016',type:'Hindi',id:3}
              ,{name:'Masti',year:'2015',type:'Hindi',id:4},{name:'Mission Impossible',year:'2014',type:'English',id:5},{name:'Commando 3',year:'2019',type:'Hindi',id:6}
              ,{name:'Fatteshikast',year:'2019',type:'Marathi',id:7},{name:'Jai Hind',year:'2019',type:'Bhojpuri',id:8},{name:'Toy Story 4',year:'2019',type:'English',id:9},
              ,{name:'Luck',year:'2013',type:'Hindi',id:10}]
    storage.set('list',mov);          
    this.initializeApp();
   }

  /**
   *   Developer : Suraj Jadhav
   *   Date: 19 Nov 2019
   *   Purpose : When app initializes it checks user is already logged in or not. 
   */
  
  initializeApp(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
   
    let authKey = localStorage.getItem('authentication_key');
    if(authKey != null){
      this.nav.setDirection('root');
      this.router.navigateByUrl('/tabs');
      
    }else{
      this.nav.setDirection('root');
      this.router.navigateByUrl('/login');
    }

  }

  ionViewDidEnter() {
    document.addEventListener("backbutton",function(e) {
      console.log("disable back button")
    }, false);
   }


 /**
  *  Developer : Suraj Jadhav
  *  Date : 19 Nov 2019 
  *  Purpose : -To log out user from app .
  *            -also clears authentication key from local storage. 
  */
  logout(){
    this.menu.close();
    localStorage.clear();
    this.nav.setDirection('root');
    this.router.navigateByUrl('/login');  
  }

  myProfile(){
    this.menu.close();
    this.router.navigateByUrl('/profile');
  }
}

