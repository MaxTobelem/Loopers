import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.page.html',
  styleUrls: ['./passwordreset.page.scss'],
})
export class PasswordresetPage implements OnInit {
  public errorMessages = {
    email: [
      { type: 'required', message: 'E-mail est obligatoire' },
      { type: 'maxlength', message: 'La longueur maximale est de 100 caractères' },
      { type: 'email',  message: 'Adresse mail invalide '}
    ],
  };
  registrationForm = this.formBuilder.group({
    email: ['' , [ Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email]],
  });


  modalTitle: string;
  modelId: number;

  getPostEntry( postTitle: string ): Observable<any> {
  return this.firestore.collection<any> ( 'Users' , ref => ref.where ( 'email' , '==' , 4 ) ).valueChanges ();
  }
  get email() {
    return this.registrationForm.get('email');
  }

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    public loadingController: LoadingController,
    private activatedActivated: ActivatedRoute,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
  }
  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }

  async submit() {
    // tslint:disable-next-line: no-string-literal
    const email = this.registrationForm.controls['email'].value;
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Veuillez patienter...',
      spinner: 'circular' ,
      duration: 1000,
      showBackdrop: true,
    });
    this.afAuth.sendPasswordResetEmail(email).then(async () => {
      loading.present();
      this.modalController.dismiss();
      const toast = await this.toastController.create({
        // tslint:disable-next-line: quotemark
        message: "Lien envoyé avec succès",
        color: 'success',
        animated: true,
        duration: 2000,
        position: 'top',
        keyboardClose : true
      });
      toast.present();
    })
    .catch(async err => {
      this.errorEmail();
    });
  }
  async errorEmail() {
    const toast = await this.toastController.create({
      // tslint:disable-next-line: quotemark
      message: "Erreur : Cet e-mail n'existe pas",
      color: 'danger',
      animated: true,
      duration: 1000,
      position: 'top',
      keyboardClose : true
    });
    toast.present();
  }

}

