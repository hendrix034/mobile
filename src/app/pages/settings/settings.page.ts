import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController} from '@ionic/angular'; 
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { ModalpopupPage } from '../../modalpopup/modalpopup.page'; 
import { HelpPage } from '../../help/help.page'; 

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

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

  ngOnInit() {
  }
  async showmodal() {  
    const modal = await this.modalCtrl.create({  
      component: ModalpopupPage,
      cssClass: 'my-custom-modal-css'  
    });  
    return await modal.present();   
  }
  async help() {  
    const modal = await this.modalCtrl.create({  
      component: HelpPage,
      cssClass: 'my-custom-modal-css'  
    });  
    return await modal.present();   
  }
  async tryLogout(){
    this.storage.clear();
    this.navCtrl.navigateRoot('/login');
    const toast = await this.toastCtrl.create({
    message: "logout",
    position: 'top',
    duration:1500
    });
    toast.present();
  }
  async account(){
    this.navCtrl.navigateRoot('/account');
   
  }
  async about(){
    this.navCtrl.navigateRoot('/about');
   
  }
}
