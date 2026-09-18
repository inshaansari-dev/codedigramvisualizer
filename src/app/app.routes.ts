import { Routes } from '@angular/router';

import { Home } from './home/home';
import { CodeToDiagram } from './code-to-diagram/code-to-diagram';
import { Features } from './features/features';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'code-to-diagram', component: CodeToDiagram },
  { path: 'features', component: Features },
  { path: 'editor', component: EditorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Keep wildcard route LAST
  { path: '**', redirectTo: '' }
];