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
    if (this.plaquelist.length !== 0) {
      for (let i = 0; i <= (this.plaquelist.length - 1); i++){
        this.firestore.collection('Cars').doc(this.plaquelist[i]).get().toPromise().then((doc) => {
          if (doc.exists) {
      this.carlist[i] = doc.get('marque') + ' ' + doc.get('modele') + ' / (' + doc.get('plaque') + ')';
        } else {
            console.log('No such document!');
        }
      });
      }
  }
  });
  }

 getUser(){
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
      this.firestore.collection('Users').doc(auth.email).get().toPromise().then((doc) => {
        if (doc.exists) {
          this.plaquelist = doc.get('plaque');
          if (this.plaquelist.length !== 0){
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
