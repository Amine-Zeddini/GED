import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-document',
  templateUrl: './import-document.component.html',
  styleUrls: ['./import-document.component.css'],
})
export class ImportDocumentComponent implements OnInit {
  pdfSource = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

  constructor() {}

  ngOnInit(): void {}
}
