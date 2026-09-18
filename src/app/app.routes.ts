import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CodeToDiagram } from './code-to-diagram/code-to-diagram';
import { Features } from './features/features';
import { EditorComponent } from './editor/editor.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'code-to-diagram', component: CodeToDiagram },
  { path: 'features', component: Features },
  { path: 'editor', component: EditorComponent },
  { path: '**', redirectTo: '' },
];
