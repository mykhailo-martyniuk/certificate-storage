import { TypeGuard } from '../../types';
import { IParsedDocument } from '../models/parsedDocument.model';

export function IsParsedCertificateDocument<T>(obj: any, typeGuard: TypeGuard<T>): obj is IParsedDocument<T> {
  return (
    obj &&
    typeof obj.file === 'object' &&
    obj.file instanceof File &&
    typeof obj.parsedData === 'object' &&
    typeGuard(obj.parsedData)
  );
}
