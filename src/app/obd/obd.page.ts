import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-obd',
  templateUrl: './obd.page.html',
  styleUrls: ['./obd.page.scss'],
})
export class ObdPage implements OnInit {
  dataOBD = {
    essence: '',
    batterie: '',
    kilometrage: '',
    nbcodeerr: '',
    vitesse: '',
    centralisation: ''
 };
  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ){
  }

  ngOnInit() {
    this.doRefresh(null);
    this.checkOBDError();
  }

  doRefresh(event) {
    this.checkOBDError();
        // tslint:disable-next-line: deprecation
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
    this.firestore.collection('OBD').doc(auth.email).get().toPromise().then((doc) => {
      if (doc.exists) {
        this.dataOBD.essence = doc.get('Essence');
        this.dataOBD.batterie = doc.get('Batterie');
        this.dataOBD.kilometrage = doc.get('Kilometrage');
        this.dataOBD.nbcodeerr = doc.get('NbCodeErr');
        this.dataOBD.vitesse = doc.get('Vitesse');
        this.dataOBD.centralisation = doc.get('Centralisation');
        if (event) {
        event.target.complete();
        }
    } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
        if (event) {
        event.target.complete();
        }
    }
   });
  }
    });

  }

  checkOBDError() {
    // tslint:disable-next-line: deprecation
this.afAuth.authState.subscribe(auth => {
  if (auth) {
this.firestore.collection('OBD').doc(auth.email).get().toPromise().then((doc) => {
  if (doc.get('NbCodeErr') < 1) {
    this.hideOBDError();
}
});
}
});
}
hideOBDError(){
  const obd = (document.getElementById('buttonErrorCode') as HTMLInputElement);
  const obdnote = (document.getElementById('noteErrorCode') as HTMLInputElement);
  obd.disabled = true;
  obdnote.setAttribute('color', 'primary');
}
}
