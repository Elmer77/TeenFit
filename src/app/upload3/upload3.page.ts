import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { AwsService } from '../aws.service';

@Component({
  selector: 'app-upload3',
  templateUrl: './upload3.page.html',
  styleUrls: ['./upload3.page.scss'],
})
export class Upload3Page {

  images = [];

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private awsProvider: AwsService, private actionSheetCtrl: ActionSheetController, private file: File, private camera: Camera) { }

  ionViewWillEnter() {
    this.loadImages();
  }

  loadImages() {
    this.images = [];
    this.awsProvider.getFileList().subscribe(files => {
      for (let name of files) {
        this.awsProvider.getSignedFileRequest(name).subscribe(res => {
          this.images.push({ key: name, url: res })
        });
      }
    });
  }

  async presentActionSheet() {
    let actionSheet =  await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  takePicture(sourceType) {
    // Create options for the Camera Dialog
    const options: CameraOptions = {
      quality: 50,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: sourceType
    }

    // Get the picture
    this.camera.getPicture(options).then(async (imageData) => {

      let loading = await this.loadingCtrl.create();
      loading.present();

      // Resolve the picture URI to a file
      this.file.resolveLocalFilesystemUrl(imageData).then(oneFile => {

        // Convert the File to an ArrayBuffer for upload
        this.file.readAsArrayBuffer(this.file.tempDirectory, oneFile.name).then(realFile => {
          let type = 'mov';
          let newName = this.awsProvider.randomString(6) + new Date().getTime() + '.' + type;

          // Get the URL for our PUT request
          this.awsProvider.getSignedUploadRequest(newName, 'image/jpeg').subscribe(data => {
            let reqUrl = data.signedRequest;

            // Finally upload the file (arrayBuffer) to AWS
            this.awsProvider.uploadFile(reqUrl, realFile).subscribe(result => {

              // Add the resolved URL of the file to our local array
              this.awsProvider.getSignedFileRequest(newName).subscribe(res => {
                this.images.push({ key: newName, url: res });
                loading.dismiss();
              });
            });
          });
        });
      }, err => {
        console.log('err: ', err);
      })
    }, (err) => {
      console.log('err: ', err);
    });
  }

  deleteImage(index) {
    let toRemove = this.images.splice(index, 1);
    this.awsProvider.deleteFile(toRemove[0]['key']).subscribe(async res => {
      let toast = await this.toastCtrl.create({
        message: res['msg'],
        duration: 2000
      });
      toast.present();
    })
  }

}
