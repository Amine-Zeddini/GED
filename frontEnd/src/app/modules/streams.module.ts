import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { ImagesComponent } from '../components/images/images.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { AddUserComponent } from '../components/user/add-user/add-user.component';
import { ListUsersComponent } from '../components/user/list-users/list-users.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProfileComponent } from '../components/profile/profile.component';
import { ImportDocumentComponent } from '../components/import-document/import-document.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { WorkflowDocumentComponent } from '../components/workflow-document/workflow-document.component';
import { ListDocumentComponent } from '../components/list-document/list-document.component';
import { AddDocumentComponent } from '../components/add-document/add-document.component';
import { ListCpfComponent } from '../components/list-cpf/list-cpf.component';
import { AddCpfComponent } from '../components/add-cpf/add-cpf.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdministrationService } from '../services/administration.service';
import { TypeDocumentService } from '../services/type-document.service';
import { DocumentService } from '../services/document.service';

import { AddAdministrationComponent } from '../components/administration/add-administration/add-administration.component';
import { ListAdministrationComponent } from '../components/administration/list-administration/list-administration.component';
import { ListTypeDocumentComponent } from '../components/typeDocument/list-type-document/list-type-document.component';
import { AddTypeDocumentComponent } from '../components/typeDocument/add-type-document/add-type-document.component';

@NgModule({
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    AddUserComponent,
    ListUsersComponent,
    SideComponent,
    ImportDocumentComponent,
    ProfileComponent,
    ImagesComponent,
    ChangePasswordComponent,
    WorkflowDocumentComponent,
    ListDocumentComponent,
    AddDocumentComponent,
    ListCpfComponent,
    AddCpfComponent,
    AddAdministrationComponent,
    ListAdministrationComponent,
    ListTypeDocumentComponent,
    AddTypeDocumentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxAutoScrollModule,
    AngularFileUploaderModule,
    PdfViewerModule,

    // angularFileUpload,
    NgxEmojiPickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    NgSelectModule,
  ],
  exports: [StreamsComponent, ToolbarComponent, SideComponent],
  providers: [
    TokenService,
    UsersService,
    AdministrationService,
    TypeDocumentService,
    DocumentService
  ],
})
export class StreamsModule {}
