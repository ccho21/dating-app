import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeagoModule } from 'ngx-timeago';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FileUploadModule,
    TimeagoModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 5000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
    NgxSpinnerModule,
  ],
  exports: [FileUploadModule, TimeagoModule, NgxSpinnerModule, ToastrModule],
})
export class SharedModule {}
