import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { InscriptionPage } from '../modals/inscription/inscription.page';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage {
  dataReturned: any;
  dataUser = {
    email: '',
    password: ''
 };
  connected: boolean;
  constructor(
    public toastController: ToastController,
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public modalController: ModalController
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
        this.connected = false;
      } else {
        console.log('connecté: ' + auth.uid);
        this.connected = true;
      }
    });
  }
  login() {
    this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password)
    .catch(err => {
      console.log('Erreur: ' + err);
      this.errorMail();
    });
    this.dataUser = {
       email: '',
       password: ''
     };
  }
  async errorMail() {
    const toast = await this.toastController.create({
      message: 'E-mail ou mot de passe incorrect',
      color: 'danger',
      animated: true,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  signup() {
    this.afAuth.createUserWithEmailAndPassword(this.dataUser.email, this.dataUser.password)
    .catch(err => {
      console.log('Erreur: ' + err);
      this.errorMail();
    });
    this.dataUser = {
      email: '',
      password: ''
    };
 }
 async openInscription() {
  const modal = await this.modalController.create({
    component: InscriptionPage,
    swipeToClose: true,
    keyboardClose: true,
  });

  modal.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
      this.dataReturned = dataReturned.data;
    }
  });

  return await modal.present();
}

}
