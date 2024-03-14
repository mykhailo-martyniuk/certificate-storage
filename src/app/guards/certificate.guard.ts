import { ICertificate } from '../models/certificate.model';

export function isICertificate(obj: any): obj is ICertificate {
  return (
    obj &&
    typeof obj.serialNumber === 'string' &&
    typeof obj.issuer === 'object' &&
    typeof obj.issuer.commonName === 'string' &&
    typeof obj.validity === 'object' &&
    typeof obj.validity.notBefore === 'string' &&
    typeof obj.validity.notAfter === 'string' &&
    typeof obj.subject === 'object' &&
    typeof obj.subject.commonName === 'string'
  );
}
