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
  mode: string = 'EDIT';

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
    this.mode = this.getMode(this.project);
  }

  getMode(project: Project | undefined) {
    return project ? 'EDIT' : 'CREATE';
  }

  deletePhoto(photoId: number) {
    console.log('### deletePhoto: ', photoId);
    if (this.project && photoId) {
      this.projectService
        .deletePhoto(this.project.id as number, photoId)
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

  updatePhoto(photo: Photo) {
    console.log('### updatePhoto: ', photo);

    // //TODO: NGRX
    if (photo) {
      // this.project?.images.push(photo);
      // if (photo.isMain) {
      //   this.user.photoUrl = photo.url;
      //   this.member.photoUrl = photo.url;
      //   this.accountService.setCurrentUser(this.user);
      // }
    }
  }

  saveProject() {
    const { projectEnded, projectStarted, images } = this.projectForm?.value;

    const form: Project = {
      ...this.projectForm?.value,
      projectEnded: new Date(projectStarted).toISOString(),
      projectStarted: new Date(projectStarted).toISOString(),
      images: this.project?.images,
    };

    if (this.mode === 'EDIT') {
      this.updateProject(form);
    } else {
      this.createProject(form);
    }
  }

  updateProject(form: Project) {
    console.log('### ngOnInit projectForm: ', this.projectForm?.value);

    const { id } = form;
    console.log('### form', form);
    console.log('### id', id);

    this.projectService.updateProject(form, id as number).subscribe((res) => {
      console.log(res);
    });
  }

  createProject(form: Project) {
    console.log('### ngOnInit projectForm: ', this.projectForm?.value);
    console.log('### form', form);
    delete form.id;
    this.projectService.createProject(form).subscribe((res) => {
      console.log(res);
    });
  }

  deleteProject() {}
}
