import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-obderrorcode',
  templateUrl: './obderrorcode.page.html',
  styleUrls: ['./obderrorcode.page.scss'],
})
export class ObderrorcodePage implements OnInit {
obderror: string[];
constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {
      // tslint:disable-next-line: deprecation
      this.afAuth.authState.subscribe(auth => {
        if (auth) {
      this.firestore.collection('OBD').doc(auth.email).get().toPromise().then((doc) => {
        if (doc.exists) {
          this.obderror = doc.get('CodeErr');
      } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
      }
     });
    }
      });
   }

ngOnInit() {
  }

}
