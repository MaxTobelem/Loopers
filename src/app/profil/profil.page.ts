import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage {
  userId: string;
  mail: string;
  method: any;
  constructor(
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
      } else {
        console.log('connecté: ' + auth.email);
        console.log('connecté: ' + auth.email);
      }
    });
  }
  logout() {
    this.afAuth.signOut();
  }

}
