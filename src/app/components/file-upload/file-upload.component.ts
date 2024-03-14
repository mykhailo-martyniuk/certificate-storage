import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CertificateParserService } from '../../services/certificate-parser.service';
import { IParsedDocument } from '../../models/parsedDocument.model';
import { ICertificate } from '../../models/certificate.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  constructor(private fileParserService: CertificateParserService) {}
  @Output()
  filesLoaded: EventEmitter<IParsedDocument<ICertificate>[]> = new EventEmitter<IParsedDocument<ICertificate>[]>();

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | null = null;
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer && event.dataTransfer.files) {
      const files = event.dataTransfer.files;
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.handleFiles(input.files);
    }
  }

  private async handleFiles(files: FileList) {
    const loadedfiles: IParsedDocument<ICertificate>[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const file = files.item(i);
        if (file) {
          const parsedData = await this.fileParserService.parseCertificateFile(file);
          loadedfiles.push({ parsedData, file });
        }
      } catch (error) {
        if (typeof error === 'string') alert(error);
      }
    }

    if (files.length > 0) this.filesLoaded.emit(loadedfiles);

    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
