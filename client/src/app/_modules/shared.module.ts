import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeagoModule } from 'ngx-timeago';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'material.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FileUploadModule,
    TimeagoModule.forRoot(),
    MaterialModule,
    NgxSpinnerModule,
  ],
  exports: [FileUploadModule, TimeagoModule, MaterialModule, NgxSpinnerModule],
})
export class SharedModule {}
