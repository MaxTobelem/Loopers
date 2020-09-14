import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
   dataUser = {
    prenom: '',
    nom: '',
    pseudo: '',
    email: '',
    password: ''
 };

  modalTitle: string;
  modelId: number;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }

  signup() {
    this.afAuth.createUserWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
    this.dataUser = {
      prenom: '',
      nom: '',
      pseudo: '',
      email: '',
      password: ''
    };
    this.firestore.collection('Users').add({
    prenom: this.dataUser.prenom,
    nom: this.dataUser.nom,
    pseudo: this.dataUser.pseudo,
    email: this.dataUser.email
    });
 }
}
