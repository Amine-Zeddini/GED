import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { DocumentService } from 'src/app/services/document.service';
import { TypeDocumentService } from './../../services/type-document.service';
import { AdministrationService } from './../../services/administration.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import _ from 'lodash';
import io from 'socket.io-client';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css'],
})
export class ListDocumentComponent implements OnInit {
  socket: any;
  document: any;
  documentsPerPage = [];
  documentsToShow = [];
  search: string;
  currentPage = 1;
  loggedInUser: any;
  userArr = [];
  documentForm: FormGroup;
  errorMessage: string;
  msSuccess: string;
  typeDocuments = [];

  administrations = []
  documents = []

  
  constructor(
    private usersService: UsersService,
    private documentService: DocumentService,
    private typeDocumentService: TypeDocumentService,
    private administrationService: AdministrationService,

    private fb: FormBuilder,

    private tokenService: TokenService,
    private router: Router
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.init();
    this.loggedInUser = this.tokenService.GetPayload();
    this.GetDocuments()
    this.GetTypeDocuments()
    this.GetAdministrations()

    this.socket.on('refreshPage', () => {
      this.GetDocuments()

    });
  }

  init() {
    this.documentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      administrationID: ['',  Validators.required],
      typeDocmentID: ['', Validators.required],
      userID: [''],
      status:['']

    });
  }

  onEdit(document) {
    console.log('document', document);
    this.document = document;
    this.documentForm = this.fb.group({
      title: [document.title, Validators.required],
      description: [document.description, Validators.required],
      administrationID: [document.administrationID,  Validators.required],
      typeDocmentID: [document.typeDocmentID, Validators.required],
      userID: [document.userID],
      status:[document.status]
    });
  }

  GetTypeDocuments() {
    this.typeDocumentService.getTypeDocuments().subscribe((data) => {
      console.log('TypeDocuments', data);
      this.typeDocuments = data.typeDocuments;
    });
  }
  GetAdministrations() {
    this.administrationService.getAdministrations().subscribe((data) => {
      console.log('administrations', data);
      this.administrations = data.administrations;
      
    });
  }
  GetDocuments() {
    this.documentService.getDocumentsByUser(this.loggedInUser._id).subscribe((data) => {
      console.log('documents', data);
      this.documents = data.documents;
      this.documentsPerPage = this.documents.slice(0, 5);
       this.documentsToShow = this.documents;
    });
  }

  editDocument(document) {
    console.log('editDocument', this.documentForm);
    console.log('document', document);
    this.documentService.editDocument(document._id, this.documentForm.value).subscribe(
      (data) => {
        this.msSuccess = 'updated successfully';
        this.socket.emit('refresh', {});

        setTimeout(() => {
          this.msSuccess = '';
        }, 2000);
        this.errorMessage = '';
        console.log(data);
      },
      (err) => {
        if (err.error.msg) {
          this.errorMessage = err.error.msg[0].message;
        }
        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }

  searchDocument() {
    this.documentsToShow = this.documents;
    this.documentsToShow = this.documentsToShow.filter(
      (document) =>
        document.title.toLowerCase().search(this.search) !== -1 
    );
    this.pageChanged({
      page: 1,
      itemsPerPage: 5,
    });
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.documentsPerPage = this.documentsToShow.slice(startItem, endItem);
  }


  openModalDelete(document) {
    this.document = document;
  }
  DeleteDocument(document) {
    console.log(document.title);
    this.documentService.deleteDocument(document._id).subscribe(
      (data) => {
        this.socket.emit('refresh', {});
      },
      (err) => console.log(err)
    );
  }

  resetForm() {
    this.documentForm.reset();
  }
}
