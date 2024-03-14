export interface ICertificate {
  serialNumber: string;
  issuer: {
    commonName: string;
  };
  validity: {
    notBefore: string;
    notAfter: string;
  };
  subject: {
    commonName: string;
  };
}
