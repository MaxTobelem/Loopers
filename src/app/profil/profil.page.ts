import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
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
    public firestore: AngularFirestore
  ) {
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

  logout() {
    this.afAuth.signOut();
  }

  }


