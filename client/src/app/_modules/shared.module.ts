import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeagoModule } from 'ngx-timeago';
import { MaterialModule } from 'material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FileUploadModule,
    TimeagoModule.forRoot(),
    MaterialModule,
    NgxSpinnerModule,
    FlexLayoutModule,
  ],
  exports: [
    FileUploadModule,
    TimeagoModule,
    MaterialModule,
    NgxSpinnerModule,
    FlexLayoutModule,
  ],
})
export class SharedModule {}
