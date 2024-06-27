import { Component, OnInit } from '@angular/core';
import { TypeDocumentService } from 'src/app/services/type-document.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import _ from 'lodash';
import io from 'socket.io-client';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-type-document',
  templateUrl: './list-type-document.component.html',
  styleUrls: ['./list-type-document.component.css'],
})
export class ListTypeDocumentComponent implements OnInit {
  socket: any;
  typeDocuments = [];
  typeDocument: any;
  typeDocumentsPerPage = [];
  typeDocumentsToShow = [];
  search: string;
  currentPage = 1;
  typeDocumentForm: FormGroup;
  errorMessage: string;
  msSuccess: string;

  constructor(
    private typeDocumentService: TypeDocumentService,
    private fb: FormBuilder,

    private tokenService: TokenService,
    private router: Router
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.init();
    this.GetTypeDocuments();

    this.socket.on('refreshPage', () => {
      this.GetTypeDocuments();
    });
  }

  init() {
    this.typeDocumentForm = this.fb.group({
      typeDocument: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onEdit(typeDocument) {
    console.log('typeDocument', typeDocument);
    this.typeDocument = typeDocument;
    this.typeDocumentForm = this.fb.group({
      typeDocument: [typeDocument.typeDocument, Validators.required],
      description: [typeDocument.description, Validators.required],
    });
  }

  GetTypeDocuments() {
    this.typeDocumentService.getTypeDocuments().subscribe((data) => {
      console.log('TypeDocuments', data);
      this.typeDocuments = data.typeDocuments;
      this.typeDocumentsPerPage = this.typeDocuments.slice(0, 5);
      this.typeDocumentsToShow = this.typeDocuments;
    });
  }

  editTypeDocument(typeDocument) {
    console.log('editTypeDocument', this.typeDocumentForm);
    console.log('administration', typeDocument);
    this.typeDocumentService
      .editTypeDocument(typeDocument._id, this.typeDocumentForm.value)
      .subscribe(
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

  searchTypeDocuments() {
    this.typeDocumentsToShow = this.typeDocuments;
    this.typeDocumentsToShow = this.typeDocumentsToShow.filter(
      (typeDocument) =>
        typeDocument.typeDocument.toLowerCase().search(this.search) !== -1
    );
    this.pageChanged({
      page: 1,
      itemsPerPage: 5,
    });
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.typeDocumentsPerPage = this.typeDocumentsToShow.slice(
      startItem,
      endItem
    );
  }

  openModalDelete(typeDocument) {
    this.typeDocument = typeDocument;
  }
  DeleteTypeDocument(typeDocument) {
    console.log(typeDocument);
    this.typeDocumentService.deleteTypeDocument(typeDocument._id).subscribe(
      (data) => {
        this.socket.emit('refresh', {});
      },
      (err) => console.log(err)
    );
  }

  resetForm() {
    this.typeDocumentForm.reset();
  }
}
