import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeagoModule } from 'ngx-timeago';
import { MaterialModule } from 'material.module';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FileUploadModule,
    TimeagoModule.forRoot(),
    MaterialModule,
    MatCarouselModule.forRoot(),
    NgxSpinnerModule,
    FlexLayoutModule,
  ],
  exports: [
    FileUploadModule,
    TimeagoModule,
    MaterialModule,
    MatCarouselModule,
    NgxSpinnerModule,
    FlexLayoutModule,
  ],
})
export class SharedModule {}
