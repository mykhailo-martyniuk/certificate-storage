import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, CertificatePipe } from './app.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { CertificateListComponent } from './components/certificate-list/certificate-list.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { CertificateListItemComponent } from './components/certificate-list/certificate-list-item/certificate-list-item.component';
import { CertificateViewComponent } from './components/certificate-view/certificate-view.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    CertificateListComponent,
    ButtonComponent,
    CertificateListItemComponent,
    CertificateViewComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CertificatePipe],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
