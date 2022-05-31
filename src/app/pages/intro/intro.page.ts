import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { SchedPage } from '../../sched/sched.page'; 
import { ModalController} from '@ionic/angular'; 
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
 datastorage: any;
 Fname: string = "";
 Email: string;
 users: any=[];
 limit:number=13;
 now: string;

today = new Date();
dd = String(this.today.getDate()).padStart(2, '0');
mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
 yyyy = this.today.getFullYear();
 start:number=0;
  constructor(
    public modalCtrl: ModalController,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}




    ionViewDidEnter(){
      this.storage.get('storage_xxx').then((res)=>{
      this.datastorage=res;
      this.Fname = this.datastorage.Fname;
      this.Email=this.datastorage.Email;
      this.loadUsers(this.Email);
      });
      this.start=0;
      this.users=[];
      this.now = this.yyyy + '-' + this.mm + '-' + this.dd; 
      console.log(this.now)
   
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

      async presentAlertConfirm(a) {
        const alert = await this.alert.create({
          cssClass: 'my-custom-class',
          header: 'Appointment',
          message: 'Do you want to cancel this Schedule?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Yes',
              handler: () => {
                this.cancel(a)
              }
            }
          ]
        });
    
        await alert.present();
      }
      // async apply(){

      //   return new Promise(resolve=>{
      //   if(this.p_time==""){
      //     alert("Time is required")
      //   }else{
      //     let body = {
      //     aksi: 'apply',
      //     p_time: this.p_time,
      //     p_date: this.p_date,
      //     Email: this.Email
      //     }
      //     console.log(body);
      //     this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
          
          
          
      //     });
      //     this.p_time = ""
      //     this.p_date = ""
      //     this.loadUsers(this.Email);
      //     }
      //     this.presentToast('Submit successful');
      //     });
          
          
      //   }
        async thisshow(){
          const modal = await this.modalCtrl.create({  
            component: SchedPage,
            cssClass: 'my-custom-modal-css'  
          });  
          return await modal.present();  
        }
        async presentToast(a){
          const toast = await this.toastCtrl.create({
            message: 'Cancel success',
            position: 'top',
            duration: 1500
          });
          toast.present();
          this.ionViewDidEnter();
        }
  

}
