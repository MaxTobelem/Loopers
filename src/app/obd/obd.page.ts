import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-obd',
  templateUrl: './obd.page.html',
  styleUrls: ['./obd.page.scss'],
})
export class ObdPage  {
  dataOBD = {
    essence: '',
    batterie: '',
    kilometrage: '',
    codeerr: '',
    pneus: '',
    centralisation: ''
 };
  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ){
    // tslint:disable-next-line: deprecation
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
    this.firestore.collection('OBD').doc(auth.email).get().toPromise().then((doc) => {
      if (doc.exists) {
        this.dataOBD.essence = doc.get('Essence');
        this.dataOBD.batterie = doc.get('Batterie');
        this.dataOBD.kilometrage = doc.get('Kilometrage');
        this.dataOBD.codeerr = doc.get('CodeErr');
        this.dataOBD.pneus = doc.get('Pneus');
        this.dataOBD.centralisation = doc.get('Centralisation');
    } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
    }
   });
  }
    });

  }
 
}
