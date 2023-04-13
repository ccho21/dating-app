import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Experience, JobDescription } from 'src/app/_models/experience';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ExperienceService } from 'src/app/_services/experience.service';
import { PhotoUploadComponent } from 'src/app/photos/photo-upload/photo-upload.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.scss'],
})
export class ExperienceEditComponent implements OnInit {
  @ViewChild('photoUpload') photoUpload?: PhotoUploadComponent;

  baseUrl = environment.apiUrl;
  experienceForm?: FormGroup;
  experience?: Experience;
  user?: User;
  mode?: string;

  maxDate?: Date;

  uploader?: FileUploader;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.experienceForm?.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private experienceService: ExperienceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user as User));
  }

  get jobDescriptions(): FormArray {
    return this.experienceForm?.get('jobDescriptions') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(({ id }) => {
      console.log('### ID', id);
      if (id) {
        this.experienceService.getExperience(id).subscribe((experience) => {
          if (!experience) {
            this.router.navigateByUrl('/main');
          }
          this.experience = experience;
          console.log('### experience', this.experience);
          this.fillForm();
          this.mode = this.experience ? 'EDIT' : 'ADD';
          this.initializeUploader(id);
        });
      } else {
        this.initializeUploader();
      }
    });
  }

  private initForm(): void {
    this.experienceForm = this.fb.group({
      id: [''],
      intro: [''],
      position: [''],
      companyName: [''],
      jobDescriptions: this.fb.array([]),
      url: [''],
      appUserId: [''],
      started: [''],
      ended: [''],
      logo: [''],
    });
  }

  private fillForm(): void {
    if (this.experience) {
      this.experienceForm?.patchValue({
        ...this.experience,
      });
    }
  }

  private getMode(): string {
    return this.experience ? 'EDIT' : 'CREATE';
  }

  initializeUploader(id?: number) {
    let url = `${this.baseUrl}projects/${id}/add-photo`;
    this.uploader = new FileUploader({
      url: url,
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
  }
}
