import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./modals/inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'passwordreset',
    loadChildren: () => import('./modals/passwordreset/passwordreset.module').then( m => m.PasswordresetPageModule)
  },
  {
    path: 'confirmpasswordreset',
    loadChildren: () => import('./modals/confirm-password-reset/confirm-password-reset.module').then( m => m.ConfirmPasswordResetPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
