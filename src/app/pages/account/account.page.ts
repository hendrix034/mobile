import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController} from '@ionic/angular'; 
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular'; 
 import { ModalPage } from '../../modal/modal.page'; 
import { AccessProviders } from '../../providers/access-providers';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  datastorage: any
  Fname: string = "";
  Mname: string = "";
  Lname: string = "";
  date_birth: string ="";
  strt: string = "";
  id_cust: string = "";
  brgy: string = "";
  city: string = "";
  province: string = "";
  phone: string = "";
  Email: string = "";
  password: string = "";
  disabledButton;
  constructor(
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private accsPrvds: AccessProviders,
    private storage: Storage
  )  { }

  ngOnInit() {
  }
  async showmodal() {  
    const modal = await this.modalCtrl.create({  
      component: ModalPage  
    });  
    return await modal.present();   
  }  
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
    this.datastorage=res;
    this.id_cust = this.datastorage.id_cust;
    this.Fname = this.datastorage.Fname;
    this.Mname=this.datastorage.Mname;
    this.Lname = this.datastorage.Lname;
    this.date_birth=this.datastorage.date_birth;
    this.strt = this.datastorage.strt;
    this.brgy=this.datastorage.brgy;
    this.city = this.datastorage.city;
    this.province = this.datastorage.province;
    this.phone = this.datastorage.phone;
    this.password = this.datastorage.password;
    });
 
 
    }

    updateProfile(){
      return new Promise(resolve =>{

        let body = {
          aksi: 'update_profile',
          id: this.id_cust,
          Lname: this.Lname,
          Fname: this.Fname,
          Mname: this.Mname,
          phone: this.phone,
          strt: this.strt,
          brgy: this.brgy,
          city: this.city,
          province: this.province,
          date_birth: this.date_birth
        }
        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            this.storage.set('storage_xxx', res.result);
            this.disabledButton = false;
            this.presentToast(res.msg);
          }else{
            this.disabledButton = false;
            this.presentToast(res.msg);


          }
        },(err)=>{
            this.disabledButton = false;
            this.presentToast('login successful');
        });
     });
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
