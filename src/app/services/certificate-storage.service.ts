import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { IParsedDocument } from '../models/parsedDocument.model';
import { ICertificate } from '../models/certificate.model';
import { IsParsedCertificateDocument } from '../guards/parsedCertificateDocument.guard';
import { isICertificate } from '../guards/certificate.guard';
import { asyncMap } from '../utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class CertificateStorageService {
  constructor(private localStorageService: LocalStorageService) {}
  private key = 'certificates';

  private convertASN1FileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result?.toString().split(',')[1];
        if (base64Data) {
          resolve(base64Data);
        } else {
          reject(new Error('Failed to convert ASN.1 file to base64 string.'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Error reading ASN.1 file.'));
      };
      reader.readAsDataURL(file);
    });
  };

  private convertBase64ToASN1File = (base64Data: string, fileName: string): File => {
    const byteString = atob(base64Data);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    return new File([blob], fileName, { type: 'application/octet-stream' });
  };

  addToStorage = async (...docs: IParsedDocument<ICertificate>[]) => {
    try {
      const convertedData = await asyncMap(docs, async (doc) => ({
        ...doc,
        file: await this.convertASN1FileToBase64(doc.file),
        fileName: doc.file.name,
      }));

      this.localStorageService.saveData(this.key, convertedData, false);
    } catch (error) {
      console.error('Помилка при збереженні в localStorage');
    }
  };

  getFromStorage = (): IParsedDocument<ICertificate>[] => {
    try {
      const docs = this.localStorageService.getData(this.key) as (IParsedDocument<ICertificate> & {
        fileName: string;
        file: string;
      })[];

      return (
        docs
          ?.map((doc) => ({ parsedData: doc.parsedData, file: this.convertBase64ToASN1File(doc.file, doc.fileName) }))
          ?.filter((doc) => IsParsedCertificateDocument(doc, isICertificate)) || []
      );
    } catch {
      console.error('Помилка при зчитуванні з localStorage');
      return [];
    }
  };

  deleteItemFromStorage = (serialNumber: string) => {
    try {
      const filterCallback = (item: IParsedDocument<ICertificate>) => item.parsedData.serialNumber !== serialNumber;
      this.localStorageService.removeItemsFromStoredArray(this.key, filterCallback);
    } catch {
      console.error('Помилка при видаленні з localStorage');
    }
  };
}
