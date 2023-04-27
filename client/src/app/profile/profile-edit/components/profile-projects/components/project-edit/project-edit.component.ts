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
import { take, tap } from 'rxjs';
import { Photo } from 'src/app/_models/photo';
import { Project } from 'src/app/_models/project';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
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
  projectForm?: FormGroup;
  maxDate?: Date;
  photos: Photo[] = [];
  mode?: string;
  user?: User;

  project?: Project;
  uploaderReady: boolean = false;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.projectForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user as User));
  }

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
          this.uploaderReady = true;
        });
      } else {
        this.uploaderReady = true;
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
      projectStarted: [new Date()],
      projectEnded: [new Date()],
    });
  }

  private fillForm(): void {
    if (this.project) {
      this.projectForm?.patchValue({
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
    console.log('### updatePhoto:', photo);

    // //TODO: NGRX
    if (photo) {
      this.project?.images.push(photo);
    }
  }

  public saveProject(): void {
    const { projectEnded, projectStarted, images } = this.projectForm?.value;

    const form: Project = {
      ...this.projectForm?.value,
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
    const { id } = form;
    this.projectService
      .updateProject(form, id as number)
      .subscribe((res: Project) => {
        console.log('### project update', res);
        this.updateImages(res.id as number);
      });
  }
  updateImages(id: number) {
    if (id) {
      const url = `${this.baseUrl}projects/${id}/add-photo`;
      this.photoUpload?.updateUrl(url);
      this.photoUpload?.uploadAll();
    }
  }

  private createProject(form: Project): void {
    console.log('### ngOnInit projectForm: ', this.projectForm?.value);
    console.log('### form:', form);
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
        this.updateImages(res.id as number);
      });
  }

  public deleteProject(): void {}
}
