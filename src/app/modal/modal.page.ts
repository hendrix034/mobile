import { Component, OnInit } from '@angular/core'; 
 import { ModalController} from '@ionic/angular';
 
import { AccessProviders } from '../providers/access-providers';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular'; 
 import { Storage } from '@ionic/storage';  
 @Component({  
   selector: 'app-modal',  
   templateUrl: './modal.page.html',   
   styleUrls: ['./modal.page.scss'],  
 })  
 export class ModalPage implements OnInit {
   password: string ="";
  old_password: string = "";
  datastorage: any;
  new_password: string = "";
  confirm_password: string= "";
  id: string="";
   constructor(public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private accsPrvds: AccessProviders,
    private storage: Storage) {}  
   ngOnInit() {  
   }  
   dismiss() {  
     this.modalCtrl.dismiss();  
   }
   ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
    this.datastorage=res;
    this.password = this.datastorage.password;
    this.id = this.datastorage.id_cust;
    });
 
 
    }
   changepassword(){
     if(this.password == this.old_password){
      if(this.new_password == this.confirm_password){
        return new Promise(resolve =>{

          let body = {
            aksi: 'change_password',
            id: this.id,
            password: this.new_password
            
          }
          this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
            if(res.success==true){
              this.storage.set('storage_xxx', res.result);
              this.presentToast(res.msg);
              this.new_password = "";
              this.confirm_password= "";
              this.old_password="";
              this.modalCtrl.dismiss(); 
            }else{
              this.presentToast(res.msg);
  
  
            }
          },(err)=>{
              this.presentToast('login successful');
          });
       });
      }else{
        this.presentToast('confirm password not matched');
      }
     }else{
      this.presentToast('incorrect password');
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