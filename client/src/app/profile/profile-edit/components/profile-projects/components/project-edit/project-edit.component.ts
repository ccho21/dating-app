import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { tap } from 'rxjs';
import { Photo } from 'src/app/_models/photo';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
import { PhotoUploadComponent } from 'src/app/photos/photo-upload/photo-upload.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent implements OnInit {
  @ViewChild('photoUpload') photoUpload?: PhotoUploadComponent;

  baseUrl = environment.apiUrl;
  projectForm!: FormGroup;
  maxDate?: Date;
  photos: Photo[] = [];
  mode?: string;

  project?: Project;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.projectForm.dirty) {
      $event.returnValue = true;
    }
  }

  uploader?: FileUploader;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.projectService.getProject(id).subscribe((project) => {
          if (!project) {
            this.router.navigateByUrl('/main');
          }
          this.project = project;
          console.log('### project', this.project);
          this.fillForm();
          this.mode = this.project ? 'EDIT' : 'ADD';
        });
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
    this.projectService
      .createProject(form)
      .pipe(
        tap((res: Project) => {
          this.project = res;
          console.log('##3 project updated');
        })
      )
      .subscribe((res: Project) => {
        // const url = `${this.baseUrl}projects/${res.id}/add-photo`;
        // if (this.uploader) {
        //   this.uploader.options.url = url;
        //   this.uploader.uploadAll();
        // }
        console.log('### project result');
        this.photoUpload?.uploadAll();
      });
  }

  public deleteProject(): void {}

  uploadImages(uploader: FileUploader) {
    console.log('### uploader', uploader);
    this.uploader = uploader;
  }
}
