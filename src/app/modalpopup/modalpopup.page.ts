import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController, AlertController, NavController } from '@ionic/angular'; 
import { AccessProviders } from '../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit {
  datastorage: any;
  message: string;
  id: string = "";
  phone: string;
  users:any = [];
  FB: string;
  website: string;
  Email: string;
  constructor(private modalController:ModalController,
    private accsPrvds: AccessProviders,
    private toastCtrl: ToastController,
    private storage: Storage) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
    this.datastorage=res;
  this.id = this.datastorage.id_cust;
   
    });
   
 this.showset()
    }

  CloseModal() {
    return new Promise(resolve =>{

      let body = {
        aksi: 'send_feedback',
        id: this.id,
        message: this.message
      }
      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          
          this.presentToast(res.msg);
          this.modalController.dismiss();
        }else{
          this.presentToast(res.msg);
          this.modalController.dismiss();


        }
      },(err)=>{
          this.presentToast('login successful');
      });
   });


  }
  Close(){
    this.modalController.dismiss();
  }
  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }
  showset(){
    return new Promise(resolve=>{
      let body={
      
     
      aksi: 'show_set'
      }
      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
      for(let data of res.result){
        this.users.push(data);
      }
      this.FB=this.users[0].FB
      this.phone=this.users[0].Phone
      this.website=this.users[0].website
      this.Email=this.users[0].Email
      resolve(true);
      });
      });
    }
  }


