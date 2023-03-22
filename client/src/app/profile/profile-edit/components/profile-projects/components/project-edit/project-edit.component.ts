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
  }

  updateProject() {
    // this.memberService.updateMember(this.member as Member).subscribe(() => {
    //   this._snackBar.open(`Profile updated successfully`, 'okay', {
    //     duration: 5000,
    //     verticalPosition: 'bottom',
    //   });
    //   this.projectsForm?.reset(this.member);
    // });
  }
}
