import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access-providers';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-sched',
  templateUrl: './sched.page.html',
  styleUrls: ['./sched.page.scss'],
})
export class SchedPage implements OnInit {
  datastorage: any;
  Fname: string = "";
  Lname: string = "";
  p_date: string = "none";
  p_time: string = "none";
  Email: string;
  users: any=[];
  today = new Date();
dd = String(this.today.getDate()).padStart(2, '0');
mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
 yyyy = this.today.getFullYear();
 now: string;
 
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController,
    private modalController:ModalController) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
    this.datastorage=res;
    this.Fname = this.datastorage.Fname;
    this.Lname = this.datastorage.Lname;
    this.Email=this.datastorage.Email;
    this.loadUsers(this.Email);
    this.now = this.yyyy + '-' + this.mm + '-' + this.dd;
    });
    
    this.users=[];
 
    }
  CloseModal() {
    this.modalController.dismiss();
  }
  async loadUsers(a){
    return new Promise(resolve=>{
    let body={
    
    Email: a,
    aksi: 'load_apply'
    }
    this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
    for(let data of res.result){
      this.users.push(data);
    }
    resolve(true);
    });
    });
  }
  async apply(){
   

    return new Promise(resolve=>{
    if(this.p_time=="none" || this.p_date=="none"){
      this.presentToast('Time & Date required');
    }else if(this.p_date<this.now){
      this.presentToast('please insert valid date');
    }else{
      let body = {
      aksi: 'apply',
      status: 'pending',
      p_time: this.p_time,
      FullName: this.Lname+','+this.Fname,
      p_date: this.p_date,
      Email: this.Email
      }
      console.log(body);
      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
      if(res.msg=='success'){
        this.presentToast('Submit successful');
      }else{
        this.presentToast('you already have appointment on that day');
      }
      
      
      });
      this.p_time = "none"
      this.p_date = "none"
      this.loadUsers(this.Email);
      
      }
      
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
