import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  public errorMessages = {
    prenom: [
      { type: 'required', message: 'Prénom est obligatoire' },
      { type: 'maxlength', message: 'La longueur maximale est de 100 caractères' },
      { type: 'minlength', message: 'La longueur minimale est de 2 caractères' }
    ],
    nom: [
      { type: 'required', message: 'Nom est obligatoire' },
      { type: 'maxlength', message: 'La longueur maximale est de 100 caractères' },
      { type: 'minlength', message: 'La longueur minimale est de 2 caractères' }
    ],
    pseudo: [
      { type: 'required', message: 'Pseudo est obligatoire' },
      { type: 'maxlength', message: 'La longueur maximale est de 20 caractères' },
      { type: 'minlength', message: 'La longueur minimale est de 4 caractères' }
    ],
    email: [
      { type: 'required', message: 'E-mail est obligatoire' },
      { type: 'maxlength', message: 'La longueur maximale est de 100 caractères' },
      { type: 'email',  message: 'Adresse mail invalide '}
    ],
    password: [
      { type: 'required', message: 'Mot de passe est obligatoire' },
      { type: 'minlength', message: 'La longueur minimale est de 6 caractères' }
    ]
  };
  registrationForm = this.formBuilder.group({
    prenom: ['' , [ Validators.required,  Validators.minLength(2), Validators.maxLength(100)]],
    nom: ['' , [ Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    pseudo: ['' , [ Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    email: ['' , [ Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email]],
    password: ['' , [ Validators.required, Validators.minLength(6)]],
  });


  modalTitle: string;
  modelId: number;

  getPostEntry( postTitle: string ): Observable<any> {
  return this.firestore.collection<any> ( 'Users' , ref => ref.where ( 'email' , '==' , 4 ) ).valueChanges ();
  }

  get prenom() {
    return this.registrationForm.get('prenom');
  }
  get nom() {
    return this.registrationForm.get('nom');
  }
  get pseudo() {
    return this.registrationForm.get('pseudo');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }


  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    public loadingController: LoadingController,
    private activateRoute: ActivatedRoute,
    public toastController: ToastController,
  ) {
  }
  ngOnInit() {}

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }

  async submit() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Veuillez patienter...',
      spinner: 'circular' ,
      duration: 1000,
      showBackdrop: true,
      animated : true,
    });
    this.afAuth.createUserWithEmailAndPassword(this.registrationForm.value.email, this.registrationForm.value.password)
    .then( () => {
      loading.present();
      this.firestore.collection('Users').doc(this.registrationForm.value.email).set({
        prenom: this.registrationForm.value.prenom,
        nom: this.registrationForm.value.nom.toUpperCase(),
        pseudo: this.registrationForm.value.pseudo,
        email: this.registrationForm.value.email
        });
      this.registrationForm.patchValue({
        prenom: '',
        nom: '',
        pseudo: '',
        email: '',
        password: ''
      });
      this.modalController.dismiss();
    })
    .catch(err => {
      console.log('Erreur: ' + err);
      this.errorEmail();
    });
  }
  async errorEmail() {
    const toast = await this.toastController.create({
      message: 'Erreur : Cet e-mail est déja pris',
      color: 'danger',
      animated: true,
      duration: 1000,
      position: 'top',
      keyboardClose : true
    });
    toast.present();
  }
}
