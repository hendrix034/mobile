import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  slideOpts = {
    initialSlide: 1,
    speed: 600,
    autoplay: true
  };

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.slides.update();
  }
  closeModal() {
    this.modalController.dismiss(null, 'cancel');
  }

}
