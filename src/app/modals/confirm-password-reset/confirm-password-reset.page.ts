import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.page.html',
  styleUrls: ['./confirm-password-reset.page.scss'],
})
export class ConfirmPasswordResetPage implements OnInit {
  frmSetNewPassword: FormGroup;
  oobCode: string;
  public errorMessages = {
    password: [
      { type: 'required', message: 'Mot de passe est obligatoire' },
      { type: 'minlength', message: 'La longueur minimale est de 6 caractères' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Mot de passe est obligatoire' },
      { type: 'minlength', message: 'La longueur minimale est de 6 caractères' }
    ]
  };
  get password() {
    return this.frmSetNewPassword.get('password');
  }
  get confirmPassword() {
    return this.frmSetNewPassword.get('confirmPassword');
  }
  constructor(
    private modalController: ModalController,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {this.frmSetNewPassword = fb.group({
    password: ['' , [ Validators.required, Validators.minLength(6)]],
    confirmpassword: ['' , [ Validators.required, Validators.minLength(6)]],
  }, {validator: ConfirmPasswordResetPage.passwordsMatch});
  }
  static passwordsMatch(cg: FormGroup): {[err: string]: any} {
    const password = cg.get('password');
    const confirmpassword = cg.get('confirmpassword');
    const rv: {[error: string]: any} = {};
    if ((password.touched || confirmpassword.touched) && password.value !== confirmpassword.value) {
      rv.passwordMismatch = true;
    }
    return rv;
  }
  async setPassword(){
    this.route.queryParams.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.oobCode = params['oobCode'];
  });
    this.afAuth
  .confirmPasswordReset(this.oobCode, this.frmSetNewPassword.value.password)
  .then( () => {
    console.log('Succes');
    this.modalController.dismiss();
  }
  )
    // () => this.router.navigate(['connexion']))
  .catch(err => {
    console.log('Erreur');
  });
  }
  ngOnInit() {
    console.log(this.oobCode);
    console.log(this.afAuth.checkActionCode(this.oobCode));
  }
  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }
}
