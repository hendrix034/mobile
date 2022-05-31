import { Component, OnInit } from '@angular/core';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  datastorage:any;
  Email:'';

  option = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    spaceBetween: 30,
    autoplay: true,
  }
users: any=[];
show: any=[];
announcement = [
  {
    announcementDetails:
      "☀️Be summer ready!☀️ Transform your prescription glasses into sunglasses.🌈😎 Visit our clinic branches at  📍 Ulo ng Apo branch 📍 Harbor Point Mall branch 🛒 www.valuevisionopticalph.com 🛒 #eyecareforyoureyeloveyou #valuevisioneyewear #valuevisionoptical #EyeglassesForEveryJuan #valuevision #opticalclinic #value #vision #optical #eyeglasses #eyeglassesph #prescriptionglasses #prescriptionglassesph #seeclearly #loveyoureyes #protectyoureyes #valueyourvision #eyesight #cleareyesight #eyeprotection #eyecare #specs"
  },
];
  constructor(
    private storage: Storage,
    private accsPrvds: AccessProviders
  ) {
    this.announcement = this.announcement.map(item => ({
      ...item,
      showMore: false
    }));
   }
   trimString(string, length) {
    return string.length > length
      ? string.substring(0, length) + "..."
      : string;
  }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage=res;
      
      this.Email=this.datastorage.Email;
      this.notif(this.Email);
      });
   
 this.load_an()
 this.users=[]
 this.show=[]
    }
async load_an(){
  return new Promise(resolve=>{
    let body={
    
    
    aksi: 'load_announcement'
    }
    this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
    for(let data of res.result){
      this.users.push(data);
    }
    console.log(this.users);
    resolve(true);
    });
    });

    }
    async notif(a){
      return new Promise(resolve=>{
        let body={
        
        Email: a,
        aksi: 'load_notif'
        }
        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
        for(let data of res.result){
          this.show.push(data);
        }
        console.log(this.show);
        resolve(true);
        });
        });
    }
    

}
