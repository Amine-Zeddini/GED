import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamsComponent } from '../components/streams/streams.component';
import { AddUserComponent } from '../components/user/add-user/add-user.component';
import { ListUsersComponent } from '../components/user/list-users/list-users.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ImportDocumentComponent } from '../components/import-document/import-document.component';
import { WorkflowDocumentComponent } from '../components/workflow-document/workflow-document.component';
import { ListDocumentComponent } from '../components/list-document/list-document.component';
import { AddDocumentComponent } from '../components/add-document/add-document.component';
import { ListCpfComponent } from '../components/list-cpf/list-cpf.component';
import { AddCpfComponent } from '../components/add-cpf/add-cpf.component';
import { AddAdministrationComponent } from '../components/administration/add-administration/add-administration.component';
import { ListAdministrationComponent } from '../components/administration/list-administration/list-administration.component';
import { ListTypeDocumentComponent } from '../components/typeDocument/list-type-document/list-type-document.component';
import { AddTypeDocumentComponent } from '../components/typeDocument/add-type-document/add-type-document.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  {
    path: 'streams',
    component: StreamsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: ListUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-administration',
    component: AddAdministrationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'administrations',
    component: ListAdministrationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-typedocument',
    component: AddTypeDocumentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'typedocuments',
    component: ListTypeDocumentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-cpf',
    component: AddCpfComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list-cpf',
    component: ListCpfComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-document',
    component: AddDocumentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list-document',
    component: ListDocumentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workflow-document',
    component: WorkflowDocumentComponent,
    canActivate: [AuthGuard],
  },


  {
    path: 'document',
    component: ImportDocumentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    redirectTo: 'streams',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class StreamsRoutingModule {}
