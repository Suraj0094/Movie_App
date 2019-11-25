import { Component, OnInit } from '@angular/core';
import {MenuController,ActionSheetController,NavController, ToastController} from '@ionic/angular';
import { Storage } from '@ionic/storage';    


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {
 
  movieList = [];            //Stores list of all movies
  bookmarkList = []
  constructor(public menu:MenuController,public storage:Storage,public actionSheetCtl:ActionSheetController,
              public navCtl:NavController,public toastCtrl:ToastController) {
    console.log('tab1'); 

    this.storage.get('list').then((data:any) =>{
      
      this.movieList = data;  
    })  
  }
 
  openMenu(){
    this.menu.open();
  }

  /**
   *   Developer : Suraj Jadhav
   *   Date : 19 Nov 2019
   *   Purpose :  Opens action sheet to mark movie as favourite.
   * 
   *   @param movie  Pass data of selected movie
   */
 async bookMark(movie){
     let toastMessage = await  this.toastCtrl.create({
      message:'Bookmark added successfully',
      position:'middle',
      duration: 2000
    })

     let actionSheet = await this.actionSheetCtl.create({
        header:'Mark',
        buttons : [{
            text:'Bookmark',
            icon:'star-outline',
            handler : () => {
               
               this.movieList.forEach(item =>{
                if(item.id == movie.id){
                    this.bookmarkList.push(item);
                     this.storage.set('bookmarkedList',this.bookmarkList);
                     toastMessage.present();
                }
             })
            }
        }]
     })
     
     
    await actionSheet.present();
    

      

}





}
