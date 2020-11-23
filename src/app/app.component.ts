import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private route: ActivatedRoute,
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.afAuth.authState.subscribe(auth => {
        if (!auth) {
          // tslint:disable-next-line: no-string-literal
          if (!(this.route.snapshot.queryParams['oobCode'])) {
          this.router.navigateByUrl('/connexion');
          }
        } else {
          this.router.navigateByUrl('/');
        }
      });
    });
  }
}
