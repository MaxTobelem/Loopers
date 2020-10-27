import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { InscriptionPage } from '../modals/inscription/inscription.page';
import { PasswordresetPage } from '../modals/passwordreset/passwordreset.page';
import { IonRouterOutlet } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage {

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  constructor(
    public toastController: ToastController,
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    public firestore: AngularFirestore,
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        this.connected = false;
      } else {
        this.connected = true;
      }
    });
  }

  dataReturned: any;
  err: string;
  public errorMessages = {
    email: [
      { type: 'required', message: 'E-mail est obligatoire' },
      { type: 'maxlength', message: 'La longueur maximale est de 100 caractères' },
      { type: 'email',  message: 'Adresse mail invalide '}
    ],
    password: [
      { type: 'minlength', message: 'La longueur minimale est de 6 caractères' }
    ]
  };

  registrationForm = this.formBuilder.group({
    email: ['' , [ Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email]],
    password: ['' , [ Validators.required, Validators.minLength(6)]],
  });
  connected: boolean;

  getPostEntry( postTitle: string ): Observable<any> {
    return this.firestore.collection<any> ( 'Users' , ref => ref.where ( 'email' , '==' , 4 ) ).valueChanges ();
    }

  async login() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Veuillez patienter...',
      spinner: 'circular' ,
      duration: 1000,
      showBackdrop: true,
      animated : true,
    });
    this.afAuth.signInWithEmailAndPassword(this.registrationForm.value.email, this.registrationForm.value.password)
    .then( () => {
      loading.present();
      this.registrationForm.patchValue({
        email: '',
        password: ''
      });
    })
    .catch(err => {
      this.errorLogin(err.code);
    });
  }

  async errorLogin(err) {
    switch (err) {
      case 'auth/wrong-password':
        const toast = await this.toastController.create({
          message: 'Erreur : Mot de passe incorrect',
          color: 'danger',
          animated: true,
          duration: 2000,
          position: 'top',
          keyboardClose : true
        });
        toast.present();
        break;
      case 'auth/user-not-found':
        const toast2 = await this.toastController.create({
          // tslint:disable-next-line: quotemark
          message: "Erreur : Nous n'avons pas trouvé de compte utilisateur associé cette adresse e-mail",
          color: 'danger',
          animated: true,
          duration: 2000,
          position: 'top',
          keyboardClose : true
        });
        toast2.present();
        break;
      case 'auth/too-many-requests':
        const toast3 = await this.toastController.create({
          message: 'Erreur : Nous avons détecté trop de demandes de votre appareil. Merci de réessayer ultérieurement',
          color: 'danger',
          animated: true,
          duration: 2000,
          position: 'top',
          keyboardClose : true
        });
        toast3.present();
        break;
        case 'auth/network-request-failed':
        const toast4 = await this.toastController.create({
          message: 'Erreur : Merci de vérifier votre connexion internet',
          color: 'danger',
          animated: true,
          duration: 2000,
          position: 'top',
          keyboardClose : true
        });
        toast4.present();
        break;
      default:
        const toastD = await this.toastController.create({
          message: 'Oups! Un problème est survenu. Réessayez plus tard.',
          color: 'danger',
          animated: true,
          duration: 2000,
          position: 'top',
          keyboardClose : true
        });
        toastD.present();
        break;
    }

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

  async openPasswordReset() {
    document.body.classList.toggle('dark', false);
    const modal = await this.modalController.create({
      component: PasswordresetPage,
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
