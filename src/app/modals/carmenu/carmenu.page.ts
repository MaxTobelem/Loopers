import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-carmenu',
  templateUrl: './carmenu.page.html',
  styleUrls: ['./carmenu.page.scss'],
})
export class CarmenuPage  implements OnInit{
  plaquelist = [''];
  carlist = [''];
  dataUser = {
    plaque: [],
 };

  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {
    this.getUser();
   }

ngOnInit(){
}

getPlaque(){
  this.afAuth.authState.subscribe(auth => {
    if (this.dataUser.plaque.length !== 0) {
    this.firestore.collection('Cars').doc(this.dataUser.plaque[0]).get().toPromise().then((doc) => {
      if (doc.exists) {
  console.log(this.carlist);
  this.carlist[0] = doc.get('marque') + ' ' + doc.get('modele') + ' / (' + doc.get('plaque') + ')';
    } else {
        console.log('No such document!');
    }
  });
  }
  });
  }

 getUser(){
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
      this.firestore.collection('Users').doc(auth.email).get().toPromise().then((doc) => {
        if (doc.exists) {
          this.dataUser.plaque = doc.get('plaque');
          if (this.dataUser.plaque.length !== 0){
            this.getPlaque();
          }
      } else {
          console.log('No such document!');
      }
    }
    );
  }
  });
  }

}
