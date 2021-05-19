import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-carinscription',
  templateUrl: './carinscription.page.html',
  styleUrls: ['./carinscription.page.scss'],
})
export class CarinscriptionPage implements OnInit {
  dataUser = {
    plaque: [],
    email: ''
  };

  get plaque() {
    return this.registrationForm.get('plaque');
  }
  get marque() {
    return this.registrationForm.get('marque');
  }
  get modele() {
    return this.registrationForm.get('modele');
  }
  get typevehicule() {
    return this.registrationForm.get('typevehicule');
  }
  get annee() {
    return this.registrationForm.get('annee');
  }
  get couleur() {
    return this.registrationForm.get('couleur');
  }
  get kilometrage() {
    return this.registrationForm.get('kilometrage');
  }
  get prix() {
    return this.registrationForm.get('prix');
  }
  get energie() {
    return this.registrationForm.get('energie');
  }
  get transmission() {
    return this.registrationForm.get('transmission');
  }
  get description() {
    return this.registrationForm.get('description');
  }
  get nbproprietaire() {
    return this.registrationForm.get('nbproprietaire');
  }

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private router: Router,
  // tslint:disable-next-line: deprecation
  ) {this.registrationForm = formBuilder.group({
    plaque: ['' , [ Validators.required,  Validators.minLength(9), Validators.maxLength(9)]],
    marque: ['' , [ Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    modele: ['' , [ Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    typevehicule: ['' , [ Validators.required]],
    annee: ['' , [ Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.min(1)]],
    couleur: ['' , [ Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    kilometrage: ['' , [ Validators.required, Validators.minLength(1), Validators.maxLength(7), Validators.min(1)]],
    prix: ['' , [ Validators.required, Validators.minLength(1), Validators.minLength(9), Validators.min(1)]],
    energie: ['' , [ Validators.required]],
    transmission: ['' , [ Validators.required]],
    description: ['' , [Validators.maxLength(300)]],
    nbproprietaire: ['' , [ Validators.required, Validators.minLength(1),  Validators.maxLength(10), Validators.min(1)]],
  });
     this.afAuth.authState.subscribe(auth => {
    if (auth) {
  this.firestore.collection('Users').doc(auth.email).get().toPromise().then((doc) => {
    if (doc.exists) {
      this.dataUser.email = auth.email;
      console.log(this.dataUser.email);
      if (doc.get('plaque').exists !== undefined){
      this.dataUser.plaque = doc.get('plaque');
      }
  } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
  }
 });
}
  });
  }
  registrationForm: FormGroup;

  public errorMessages = {
    plaque: [
      { type: 'required', message: 'Plaque est obligatoire' },
      { type: 'maxlength', message: 'Le format est incorrect' },
      { type: 'minlength', message: 'Le format est incorrect' }
    ],
    marque: [
      { type: 'required', message: 'Marque est obligatoire' },
      { type: 'maxlength', message: 'La longueur maximale est de 20 caractères' },
      { type: 'minlength', message: 'La longueur minimale est de 2 caractères' }
    ],
    modele: [
      { type: 'required', message: 'Modèle est obligatoire' },
      { type: 'maxlength', message: 'La longueur maximale est de 20 caractères' },
      { type: 'minlength', message: 'La longueur minimale est de 2 caractères' }
    ],
    typevehicule: [
      { type: 'required', message: 'Type de véhicule est obligatoire' }
    ],
    annee: [
      { type: 'required', message: 'Année est obligatoire' },
      { type: 'maxlength', message: 'Le format est incorrect' },
      { type: 'minlength', message: 'Le format est incorrect' },
      { type: 'min', message: 'La valeur est trop petite' }
    ],
    couleur: [
      { type: 'required', message: 'Couleur est obligatoire' },
      { type: 'maxlength', message: 'La longueur maximale est de 20 caractères' },
      { type: 'minlength', message: 'La longueur minimale est de 2 caractères' }
    ],
    kilometrage: [
      { type: 'required', message: 'Kilométrage est obligatoire' },
      { type: 'maxlength', message: 'La longueur maximale est de 7 chiffres' },
      { type: 'minlength', message: 'La longueur minimale est de 1 chiffre' },
      { type: 'min', message: 'La valeur est trop petite' }
    ],
    prix: [
      { type: 'required', message: 'Prix est obligatoire' },
      { type: 'maxlength', message: 'La longueur maximale est de 7 chiffres' },
      { type: 'minlength', message: 'La longueur minimale est de 1 chiffre' },
      { type: 'min', message: 'La valeur est trop petite' }
    ],
    energie: [
      { type: 'required', message: 'Energie est obligatoire' }
    ],
    transmission: [
      { type: 'required', message: 'Transmission est obligatoire' }
    ],
    description: [
  { type: 'maxlength', message: 'La longueur maximale est de 300 caractères' }
    ],
    nbproprietaire: [
      { type: 'required', message: 'Nombre de propriétaires est obligatoire' },
      { type: 'maxlength', message: 'La longueur maximale est de 7 chiffres' },
      { type: 'minlength', message: 'La longueur minimale est de 1 chiffre' },
      { type: 'min', message: 'La valeur est trop petite' }
    ],
  };

  ngOnInit() {
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
     loading.present();
     this.dataUser.plaque.push(this.registrationForm.value.plaque);
     this.firestore.collection('Users').doc(this.dataUser.email).update({
        plaque: this.dataUser.plaque
        });
     this.firestore.collection('Cars').doc(this.registrationForm.value.plaque).set({
        plaque: this.registrationForm.value.plaque,
        marque: this.registrationForm.value.marque.toUpperCase(),
        modele: this.registrationForm.value.modele.toUpperCase(),
        typevehicule: this.registrationForm.value.typevehicule.toUpperCase(),
        annee: this.registrationForm.value.annee,
        couleur: this.registrationForm.value.couleur.toUpperCase(),
        kilometrage: this.registrationForm.value.kilometrage,
        prix: this.registrationForm.value.prix,
        energie: this.registrationForm.value.energie.toUpperCase(),
        transmission: this.registrationForm.value.transmission.toUpperCase(),
        description: this.registrationForm.value.description,
        nbproprietaire: this.registrationForm.value.nbproprietaire,
        owner: this.dataUser.email
        });
     this.registrationForm.patchValue({
      plaque: '',
      marque: '',
      modele: '',
      typevehicule: '',
      annee: '',
      couleur: '',
      kilometrage: '',
      prix: '',
      energie: '',
      transmission: '',
      description: '',
      nbproprietaire: '',
      });
     this.router.navigateByUrl('/profil');

  }
}

