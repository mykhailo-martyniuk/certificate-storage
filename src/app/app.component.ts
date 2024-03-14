import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';

import { ICertificate } from './models/certificate.model';
import { IParsedDocument } from './models/parsedDocument.model';
import { CertificateStorageService } from './services/certificate-storage.service';

@Pipe({ standalone: true, name: 'certificatePipe' })
export class CertificatePipe implements PipeTransform {
  transform(parsedDocuments: IParsedDocument<ICertificate>[]): { serialNumber: string; commonName: string }[] {
    return parsedDocuments.map((doc) => ({
      serialNumber: doc.parsedData.serialNumber,
      commonName: doc.parsedData.subject.commonName,
    }));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private certificateStorageService: CertificateStorageService) {}

  title = 'certificate-storage';
  parsedDocuments: IParsedDocument<ICertificate>[] = [];
  selectedCertificate: IParsedDocument<ICertificate> | undefined = undefined;
  showView = false;
  showFileUpload = false;

  handleFilesLoaded = (newParsedDocuments: IParsedDocument<ICertificate>[]) => {
    const serialNumbers = this.parsedDocuments.map((doc) => doc.parsedData.serialNumber);
    const duplicatedDocuments: string[] = [];
    const docsWithoutDuplate = newParsedDocuments.filter((doc) => {
      if (serialNumbers.includes(doc.parsedData.serialNumber)) {
        duplicatedDocuments.push(doc.parsedData.serialNumber);
        return false;
      }
      return true;
    });

    this.parsedDocuments = [...this.parsedDocuments, ...docsWithoutDuplate];
    this.certificateStorageService.addToStorage(...docsWithoutDuplate);

    if (duplicatedDocuments.length > 0)
      alert('Сертефікати з такими serialNumber вже додані в систему:\n' + duplicatedDocuments.join('\n'));
  };

  handleBtnAddClick = () => {
    this.showFileUpload = true;
    this.selectedCertificate = undefined;
    this.showView = false;
  };

  handleBtnBackClick = () => {
    this.showFileUpload = false;
  };

  handleCertificateListItemClick = (id: string) => {
    this.selectedCertificate = this.parsedDocuments.find((doc) => doc.parsedData.serialNumber === id);
    this.showFileUpload = false;
    this.showView = true;
  };

  handleDeleteParsedDocument = (serialNumber: string) => {
    this.parsedDocuments = this.parsedDocuments.filter((doc) => doc.parsedData.serialNumber !== serialNumber);
    this.certificateStorageService.deleteItemFromStorage(serialNumber);
  };

  ngOnInit() {
    this.parsedDocuments = this.certificateStorageService.getFromStorage();
  }
}
