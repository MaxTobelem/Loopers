import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage {
  dataUser = {
    nom: '',
    prenom: '',
    pseudo: ''
 };


  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private menu: MenuController
  ) {
    // tslint:disable-next-line: deprecation
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
    this.firestore.collection('Users').doc(auth.email).get().toPromise().then((doc) => {
      if (doc.exists) {
        this.dataUser.nom = doc.get('nom');
        this.dataUser.prenom = doc.get('prenom');
        this.dataUser.pseudo = doc.get('pseudo');
    } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
    }
   });
  }
    });

  }

  openMenu() {
    this.menu.open('menu');
  }

  logout() {
    this.afAuth.signOut();
  }

  }


