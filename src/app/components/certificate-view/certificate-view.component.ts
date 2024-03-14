import { Component, Input } from '@angular/core';
import { ICertificate } from '../../models/certificate.model';
import { IParsedDocument } from '../../models/parsedDocument.model';
import { FileDownloadService } from '../../services/file-donwload-service.service';

@Component({
  selector: 'app-certificate-view',
  templateUrl: './certificate-view.component.html',
  styleUrls: ['./certificate-view.component.css'],
})
export class CertificateViewComponent {
  constructor(private fileDownloadService: FileDownloadService) {}

  @Input()
  certificate: IParsedDocument<ICertificate> | undefined = undefined;

  handleDownload = () => {
    if (this.certificate?.file) this.fileDownloadService.downloadFile(this.certificate?.file);
    else {
      alert('Помилка при завантаженні');
    }
  };
}
