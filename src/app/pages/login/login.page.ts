import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email_address: string = "";
  password: string = "";
  disabledButton;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  openRegister(){
    this.router.navigate(['/register']);
  }
  async tryLogin(){
    if(this.email_address==""){
      this.presentToast("Email is required")
    }else if(this.password==""){
      this.presentToast("password is required")
    }else{
     this.disabledButton = true;
     const loader = await this.loadingCtrl.create({
        message: 'please wait........',
     });
     loader.present();

     return new Promise(resolve =>{

        let body = {
          aksi: 'proses_login',
          Email: this.email_address,
          password: this.password
        }
        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('login successful');
            this.storage.set('storage_xxx', res.result);
            console.log(res.result);
            this.navCtrl.navigateRoot(['/crud']);
          }else if(res.success==false){
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Email or password incorrect');


          }
        },(err)=>{
          loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Email or password incorrect');
        });
     });
    }
  }
  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }

}
