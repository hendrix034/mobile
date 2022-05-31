import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tracer',
  templateUrl: './tracer.page.html',
  styleUrls: ['./tracer.page.scss'],
})
export class TracerPage implements OnInit {
  datastorage: any;
number1: number = 0;
number2: number = 0;
number3: number = 0;
number4: number = 0;
number5: number = 0;
 Email: string;
 temp: string = "";
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
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
    this.datastorage=res;
   
    this.Email=this.datastorage.Email;
    });
    
 
    }
  async show(){
    
    return new Promise(resolve=>{
      
      if(this.temp==""){
        alert("temperature required")
      }else{
        let body = {
        aksi: 'insert_asses',
        number1: this.number1,
        number2: this.number2,
        number3: this.number3,
        number4: this.number4,
        number5: this.number5,
        temp: this.temp,
        Email: this.Email
        }
        console.log(body);
        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
        this.presentToast(res.msg)
        
        
        });
        
        }
        
        });
  
      
      
    }
    async presentToast(a){
      const toast = await this.toastCtrl.create({
        message: a,
        duration: 1500,
        position: 'top'
      });
      toast.present();
    }
    async numbe1(){
      if(this.number1==1){
        this.number1=0
      }else{
        this.number1=1
      }
     
        
      }
      async numbe2(){
        if(this.number2==1){
          this.number2=0
        }else{
          this.number2=1
        }
       
          
          
        }
        async numbe3(){
          if(this.number3==1){
            this.number3=0
          }else{
            this.number3=1
          }
          
            
            
          }
          async numbe4(){
            if(this.number4==1){
              this.number4=0
            }else{
              this.number4=1
            }
           
              
              
            }
            async numbe5(){
              if(this.number5==1){
                this.number5=0
              }else{
                this.number5=1
              }
             
                
                
              }
            


}
