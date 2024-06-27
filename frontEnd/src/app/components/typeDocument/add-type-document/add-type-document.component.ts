import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeDocumentService } from '../../../services/type-document.service';
@Component({
  selector: 'app-add-type-document',
  templateUrl: './add-type-document.component.html',
  styleUrls: ['./add-type-document.component.css'],
})
export class AddTypeDocumentComponent implements OnInit {
  typeDocumentForm: FormGroup;
  errorMessage: string;
  msSuccess: string;

  constructor(
    private typeDocumentService: TypeDocumentService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.init();
  }

  init() {
    this.typeDocumentForm = this.fb.group({
      typeDocument: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addTypeDocument() {
    this.typeDocumentService
      .addTypeDocument(this.typeDocumentForm.value)
      .subscribe(
        (data) => {
          this.typeDocumentForm.reset();
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
}
