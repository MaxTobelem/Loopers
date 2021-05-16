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
  dataUser = {
    nom: '',
    prenom: '',
    pseudo: '',
    ville: '',
    pays: '',
    description: '',
    plaque: '',
    profil: '/Users/',
    voiture: ''
 };


  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private menu: MenuController,
    public afDB: AngularFireDatabase,
    public afSG: AngularFireStorage
  ) {
    // tslint:disable-next-line: deprecation
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
        this.dataUser.plaque = doc.get('plaque');
        this.dataUser.profil = this.dataUser.profil.concat(auth.email);
        this.dataUser.voiture = this.dataUser.profil;
        this.dataUser.profil = this.dataUser.profil.concat('/profil.jpg');
        this.dataUser.voiture = this.dataUser.voiture.concat('/Cars/' + this.dataUser.plaque + '/car1.jpg');
        this.getImagesStorage();
    } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
    }
   });
  }
    });

  }
  ngOnInit() {
  this.checkOBD();
}
  openMenu() {
    this.menu.open('menu');
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


getImagesStorage() {
  this.afSG.ref(this.dataUser.profil).getDownloadURL().subscribe(imgUrl1 => {
    this.imagesP.push({
      name: 'Profil',
      url: imgUrl1
    });
  });
  this.afSG.ref(this.dataUser.voiture).getDownloadURL().subscribe(imgUrl2 => {
    console.log(imgUrl2);
    this.imagesV.push({
      name: 'Voiture',
      url: imgUrl2
    });
  });
}
  }


