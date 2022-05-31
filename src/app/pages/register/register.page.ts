import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  Lname: string = "";
  Fname: string = "";
  Mname: string = "";
  email_address: string = "";
  gender: string = "";
  date_birth: string = "";
  phone: string = "";
  strt: string ="";
  brgy: string ="";
  city: string ="";
  province: string ="";
  password: string = "";
  Confirm_password: string = "";

  disabledButton;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private accsPrvds: AccessProviders
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.disabledButton = false;
  }
 async tryRegister(){
    if(this.Lname==""){
      this.presentToast("Last Name is required")
    }else if(this.Fname==""){
      this.presentToast("First Name is required")
    }else if(this.Mname==""){
      this.presentToast("Middle Name is required")
    }else if(this.email_address==""){
      this.presentToast("Email is required")
    }else if(this.gender==""){
      this.presentToast("gender is required")
    }else if(this.date_birth==""){
      this.presentToast("Date of birth is required")
    }else if(this.password==""){
      this.presentToast("password is required")
    }else if(this.password!=this.Confirm_password){
      this.presentToast("password not matched")
    }else{
     this.disabledButton = true;
     const loader = await this.loadingCtrl.create({
        message: 'please wait........',
     });
     loader.present();

     return new Promise(resolve =>{

        let body = {
          aksi: 'proses_register',
          Lname: this.Lname,
          Fname: this.Fname,
          Mname: this.Mname,
          phone: this.phone,
          Email: this.email_address,
          strt: this.strt,
          brgy: this.brgy,
          city: this.city,
          province: this.province,
          gender: this.gender,
          date_birth: this.date_birth,
          password: this.password
        }
        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            this.router.navigate(['/login']);
          }else{
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);


          }
        },(err)=>{
          loader.dismiss();
            this.disabledButton = false;
            this.presentToast('login successful');
            this.router.navigate(['/login']);
        });
     });
    }
  }
  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  async presentAlert(a) {
    const alert = await this.alert.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Try Again',
          handler: () => {
           this.tryRegister();
          }
        }
      ]
    });

    await alert.present();
  }
}
