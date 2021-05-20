import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit{
  imagesP = [];
  imagesV = [];
  plaquelist = [''];
  carlist = [''];
  carlinklist = [''];
  dataUser = {
    nom: '',
    prenom: '',
    pseudo: '',
    ville: '',
    pays: '',
    description: '',
    profil: '/Users/',
    voiture: ''
 };

 dataCar = {
  plaque: '',
  marque: '',
  modele: '',
  annee: '',
};



  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private menu: MenuController,
    public afDB: AngularFireDatabase,
    public afSG: AngularFireStorage,
  ) {
    // tslint:disable-next-line: deprecation
}

  ngOnInit() {
  this.getUser();
  this.checkOBD();

}
  openMenu() {
    this.menu.open('menu');
}
  getPlaque(){
this.afAuth.authState.subscribe(auth => {
  if (this.plaquelist.length !== 0) {
  for (let i = 0; i <= (this.plaquelist.length - 1); i++){
  this.firestore.collection('Cars').doc(this.plaquelist[i]).get().toPromise().then((doc) => {
    if (doc.exists) {
      this.carlist[i] = doc.get('marque') + ' ' + doc.get('modele');
  } else {
      console.log('No such document!');
  }
});
}}
});
}

  getUser(){
  this.afAuth.authState.subscribe(auth => {
    if (auth) {
    this.firestore.collection('Users').doc(auth.email).get().toPromise().then((doc) => {
      if (doc.exists) {
        this.dataUser.nom = doc.get('nom');
        this.dataUser.prenom = doc.get('prenom');
        this.dataUser.pseudo = doc.get('pseudo');
        this.dataUser.ville = doc.get('ville');
        this.dataUser.pays = doc.get('pays');
        this.dataUser.description = doc.get('description');
        this.dataUser.profil = '/Users/' + auth.email + '/profil.jpg';
        this.plaquelist = doc.get('plaque');
        this.getImageProfil();
        if (this.plaquelist.length !== 0){
          this.getPlaque();
          for (let i = 0; i <= this.plaquelist.length; i++){
            this.carlinklist[i] = '/Users/' + auth.email + '/Cars/' + this.plaquelist[i] + '/car1.jpg';
          }
          this.getImagesStorage();
        }
    } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
    }
  }
  );
}
});
}




  getImageProfil() {
  this.afSG.ref(this.dataUser.profil).getDownloadURL().subscribe(imgUrl => {
    this.imagesP.push({
      name: 'Profil',
      url: imgUrl
    });
  });
}

  getImagesStorage() {
  for (let i = 0; i <= (this.plaquelist.length - 1); i++){
    this.afSG.ref(this.carlinklist[i]).getDownloadURL().subscribe(imgUrl2 => {
      this.imagesV.push({
        name: 'Voiture',
        url: imgUrl2
      });
    });
    }

}

logout() {
  this.afAuth.signOut();
}

checkOBD() {
  // tslint:disable-next-line: deprecation
this.afAuth.authState.subscribe(auth => {
if (auth) {
this.firestore.collection('OBD').doc(auth.email).get().toPromise().then((doc) => {
if (!doc.exists) {
  this.hideOBD();
}
});
}
});
}

hideOBD(){
const obd = (document.getElementById('buttonOBD') as HTMLInputElement);
obd.disabled = true;
const CarBox = (document.getElementById('CarBox') as HTMLInputElement);
CarBox.innerText = 'CarBox - Premium';
}
}


