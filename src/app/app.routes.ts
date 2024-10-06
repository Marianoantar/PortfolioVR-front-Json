import { Routes } from '@angular/router';
import { AbautComponent } from './components/abaut/abaut.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { authGuard } from './guards/auth.guard';
// import { PruebaComponent } from './prueba/prueba.component';

export const routes: Routes = [
    { path: '', component: AbautComponent },
    { path: 'home', component: AbautComponent },
    { path: 'sobre-mi', component: AbautComponent },
    { path: 'proyectos', component: ProjectsComponent },
    { path: 'crear-proyecto', component: CreateComponent, canActivate:[authGuard]},
    { path: 'contacto', component: ContactComponent },
    { path: 'proyecto/:name', component: DetailComponent},
    { path: 'editar-proyecto/:id', component: EditComponent},
    { path: '**', component: ErrorComponent}
];
