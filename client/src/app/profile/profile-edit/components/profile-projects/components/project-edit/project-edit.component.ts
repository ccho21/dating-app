import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/_models/photo';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent implements OnInit {
  projectForm!: FormGroup;
  maxDate?: Date;
  photos: Photo[] = [];
  mode: string = 'EDIT';

  project?: Project;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.projectForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.getProject(id);
        this.mode = 'EDIT';
      } else {
        this.mode = 'CREATE';
      }
    });
  }

  private initForm(): void {
    this.projectForm = this.fb.group({
      id: null,
      name: ['creating a project'],
      intro: ['this project is just a same ple one'],
      projectWith: ['I build this app all by my self'],
      description: ['to learn c# and Angular'],
      mainFeature: [
        'Searching, finding, message, looking for people, CRUD projects, photos, experiences',
      ],
      url: ['localhost:4200'],
      githubUrl: ['github.com/ccho21'],
      frontEnd: ['angular, rxjs, ngrx'],
      backEnd: ['dotnet c#'],
      database: ['postgresSQL'],
      deployement: ['Heroku'],
      projectStarted: [''],
      projectEnded: [''],
    });
  }

  private getProject(id: number): void {
    this.projectService.getProject(id).subscribe((project) => {
      this.project = project;
      this.fillForm();
    });
  }

  private fillForm(): void {
    if (this.project) {
      this.projectForm.patchValue({
        ...this.project,
      });
    }
  }

  private getMode(): string {
    return this.project ? 'EDIT' : 'CREATE';
  }

  public deletePhoto(photoId: number): void {
    console.log(`### deletePhoto: ${photoId}`);

    if (!this.project || !photoId) {
      return;
    }

    this.projectService
      .deletePhoto(this.project.id as number, photoId)
      .subscribe(() => {
        //TODO: NGRX
        if (this.project) {
          this.project.images = this.project.images.filter(
            (x) => x.id !== photoId
          );
        }
      });
  }

  public updatePhoto(photo: Photo): void {
    console.log(`### updatePhoto: ${photo}`);

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

  public saveProject(): void {
    const { projectEnded, projectStarted, images } = this.projectForm.value;

    const form: Project = {
      ...this.projectForm.value,
      projectEnded: new Date(projectEnded).toISOString(),
      projectStarted: new Date(projectStarted).toISOString(),
      images: this.project?.images,
    };

    if (this.mode === 'EDIT') {
      this.updateProject(form);
    } else {
      this.createProject(form);
    }
  }

  private updateProject(form: Project): void {
    console.log(`### ngOnInit projectForm: ${this.projectForm.value}`);

    const { id } = form;

    console.log(`### form: ${form}`);
    console.log(`### id: ${id}`);

    this.projectService.updateProject(form, id as number).subscribe((res) => {
      console.log(res);
    });
  }

  private createProject(form: Project): void {
    console.log(`### ngOnInit projectForm: ${this.projectForm.value}`);
    console.log(`### form: ${form}`);
    delete form.id;
    this.projectService.createProject(form).subscribe((res) => {
      console.log(res);
    });
  }

  public deleteProject(): void {}
}
