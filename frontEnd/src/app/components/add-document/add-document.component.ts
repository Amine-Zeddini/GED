import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { TypeDocumentService } from './../../services/type-document.service';
import { AdministrationService } from './../../services/administration.service';

import { DocumentService } from './../../services/document.service';

import { TokenService } from './../../services/token.service';

import { AngularFileUploaderComponent } from 'angular-file-uploader';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css'],
})
export class AddDocumentComponent implements OnInit {
  @ViewChild('fileUpload1')
  private fileUpload1: AngularFileUploaderComponent;

  afuConfig = {
    formatsAllowed: '.jpg,.png',
    multiple: false,
    uploadAPI: {
      // url: URL,
      // method: 'POST',
    },
    replaceTexts: {
      selectFileBtn: 'Select Image',
      afterUploadMsg_success: '',
      afterUploadMsg_error: '',
      sizeLimit: '',
    },
  };
  documentForm: FormGroup;
  errorMessage: string;
  msSuccess: string;
  role = ['Administrateur', 'Gestionnaire', 'Agent'];
  user:any
  typeDocuments = [];
  administrations = [];
  pdfDocument = "../../../assets/images/titre-foncier.pdf";
  show=''
  constructor(
    private tokenService: TokenService,
    private typeDocumentService: TypeDocumentService,
    private documentService: DocumentService,

    private administrationService: AdministrationService,

    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.init();
    this.user = this.tokenService.GetPayload();

    this.GetAdministrations()
    this.GetTypeDocuments();
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
  addDocument() {
    this.documentForm.value.userID = this.user._id
    this.documentForm.value.status = "Brouillon"
    console.log('document', this.documentForm.value);
    this.documentService.addDocument(this.documentForm.value).subscribe(
      (data) => {
        this.documentForm.reset();
        this.msSuccess = 'created successfully';
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

  readPdf(){
    this.pdfDocument="../../../assets/images/titre-foncier.pdf"
  }
}
