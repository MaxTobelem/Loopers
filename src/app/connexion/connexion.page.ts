import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { InscriptionPage } from '../modals/inscription/inscription.page';
import { IonRouterOutlet } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
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
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public loadingController: LoadingController
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        this.connected = false;
      } else {
        this.connected = true;
      }
    });
  }
  async login() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Veuillez patienter...',
      duration: 1000,
      animated: true
    });
    await loading.present();
    this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password)
    .catch(err => {
      console.log('Erreur: ' + err);
      this.errorMail();
    });
    this.dataUser = {
       email: '',
       password: ''
     };

    await loading.present();
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
 async openInscription() {
  document.body.classList.toggle('dark', false);
  const modal = await this.modalController.create({
    component: InscriptionPage,
    swipeToClose: true,
    keyboardClose: true,
    presentingElement: this.routerOutlet.nativeEl
  });

  modal.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
      this.dataReturned = dataReturned.data;
    }
  });

  return await modal.present();
}

}
