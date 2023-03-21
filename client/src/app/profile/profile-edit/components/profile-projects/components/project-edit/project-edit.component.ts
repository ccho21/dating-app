import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Photo } from 'src/app/_models/photo';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent implements OnInit {
  @Input() projectForm?: FormGroup;
  @Input() project?: Project;
  maxDate?: Date;
  photos: Photo[] = [];

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.projectForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    console.log('### ngOnInit projectForm: ', this.projectForm);
    console.log('### ngOnInit project: ', this.project);
  }

  setMainPhoto(photo: Photo) {
    console.log('### setMainPhoto: ', photo);
    // this.memberService.setMainPhoto(photo.id).subscribe(() => {
    //   if (this.user && this.member) {
    //     this.user.photoUrl = photo.url;
    //     this.accountService.setCurrentUser(this.user);

    //     //TODO: NGRX
    //     this.member.photoUrl = photo.url;
    //     this.member.photos.forEach((p) => {
    //       if (p.isMain) p.isMain = false;
    //       if (p.id === photo.id) p.isMain = true;
    //     });
    //   }
    // });
  }

  updatePhoto(photo: Photo) {
    console.log('### updatePhoto: ', photo);

    // //TODO: NGRX
    if (photo) {
      // if (photo.isMain) {
      //   this.user.photoUrl = photo.url;
      //   this.member.photoUrl = photo.url;
      //   this.accountService.setCurrentUser(this.user);
      // }
    }
  }

  deletePhoto(photoId: number) {
    console.log('### deletePhoto: ', photoId);
    if (this.project && photoId) {
      this.projectService
        .deletePhoto(this.project.id, photoId)
        .subscribe(() => {
          if (this.project) {
            //TODO: NGRX
            this.project.images = this.project.images.filter(
              (x) => x.id !== photoId
            );
          }
        });
    }
    // this.memberService.deletePhoto(photoId).subscribe(() => {
    //   if (this.member) {
    //     //TODO: NGRX
    //     this.member.photos = this.member.photos.filter((x) => x.id !== photoId);
    //   }
    // });
  }
}
