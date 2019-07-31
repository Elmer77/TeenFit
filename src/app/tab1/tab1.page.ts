import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private imageSrc: string;
  public workouts = [
    {
      background: 'assets/pushupsguy.jpg',
      points: '100',
      challenge: 'Push Ups',
      name: 'Tyler Adams',
      num: '5',
      routerLink: '/upload'
    },
    {
      background: 'assets/pullups.png',
      points: '100',
      challenge: 'Pull Ups',
      name: 'Elmer Vasquez',
      num: '4',
      routerLink: '/upload2'
    },
    {
      background: 'assets/situps.jpg',
      points: '100',
      challenge: 'Sit Ups',
      name: 'Roberto Sanchez',
      num: '6',
      routerLink: '/upload3'
    }
  ]

  constructor(private navCtrl: NavController) {}

  // private openGallery (): void {
  //   let cameraOptions = {
  //     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  //     destinationType: Camera.DestinationType.FILE_URI,      
  //     quality: 100,
  //     targetWidth: 1000,
  //     targetHeight: 1000,
  //     encodingType: Camera.EncodingType.JPEG,      
  //     correctOrientation: true
  //   }
  
  //   Camera.getPicture(cameraOptions)
  //     .then(file_uri => this.imageSrc = file_uri, 
  //     err => console.log(err));   
  // }


}