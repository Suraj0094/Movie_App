import { Component } from '@angular/core';
import { Storage } from '@ionic/storage'; 
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  bookmarkedList = [];         //stores list bookmarked movies
  constructor(public storage:Storage,public menu:MenuController) {

    
  }

  /** 
   *  Developer : Suraj Jadhav
   *  Date : 22 Nov 2019
   *  Purpose : Loades bookmarked movies from local storage.
   *            -So user can view his all bookmarked movies. 
  */
  ionViewWillEnter(){
     this.storage.get('bookmarkedList').then(data =>{
        this.bookmarkedList = data;
     })   
  }

  openMenu(){
    this.menu.open();
  }

}
