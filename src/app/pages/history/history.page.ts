import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular'; 
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  datastorage: any;
  Fname: string = "";
  p_date: string = "";
  p_time: string = "";
  Email: string;
  users: any=[];
  limit:number=13;
  start:number=0;
  constructor(
    private accsPrvds: AccessProviders,
    private toastCtrl: ToastController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
    this.datastorage=res;
    this.Fname = this.datastorage.Fname;
    this.Email=this.datastorage.Email;
    this.loadUsers(this.Email);
    });
    this.start=0;
    this.users=[];
 
    }
    cancel(c){
      return new Promise(resolve =>{

        let body = {
          aksi: 'cancel_appointment',
          id: c
        }
        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            
            this.presentToast(res.msg);
          }else{
            this.presentToast(res.msg);


          }
        },(err)=>{
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
      window.location.reload();
    }
    async loadUsers(a){
      return new Promise(resolve=>{
      let body={
      
      Email: a,
      aksi: 'load_history'
      }
      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
      for(let data of res.result){
        this.users.push(data);
      }
      resolve(true);
      });
      });
    }

}
