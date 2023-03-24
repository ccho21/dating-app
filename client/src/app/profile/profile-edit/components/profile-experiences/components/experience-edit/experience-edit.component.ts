import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Experience, JobDescription } from 'src/app/_models/experience';
import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.scss'],
})
export class ExperienceEditComponent implements OnInit {
  @Input() experienceForm?: FormGroup;
  @Input() experience?: Experience;
  maxDate?: Date;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.experienceForm?.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private fb: FormBuilder) {}

  get jobDescriptions(): FormArray {
    return this.experienceForm?.get('jobDescriptions') as FormArray;
  }

  ngOnInit(): void {
    if (this.experienceForm) {
      // this.addJobDescription();
    }
  }

  deletePhoto(photoId: number) {
    console.log('### deletePhoto: ', photoId);
    // if (this.experience && photoId) {
    //   this.experienceService
    //     .deletePhoto(this.experience.id as number, photoId)
    //     .subscribe(() => {
    //       if (this.experience) {
    //         //TODO: NGRX
    //         this.experience.logo = this.experience.images.filter(
    //           (x) => x.id !== photoId
    //         );
    //       }
    //     });
    // }
  }

  updatePhoto(photo: Photo) {
    console.log('### updatePhoto: ', photo);

    // //TODO: NGRX
    if (photo) {
      // this.experience?.images.push(photo);
      // if (photo.isMain) {
      //   this.user.photoUrl = photo.url;
      //   this.member.photoUrl = photo.url;
      //   this.accountService.setCurrentUser(this.user);
      // }
    }
  }
}
