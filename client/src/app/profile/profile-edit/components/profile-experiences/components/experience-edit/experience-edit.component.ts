import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Experience, JobDescription } from 'src/app/_models/experience';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ExperienceService } from 'src/app/_services/experience.service';
import { PhotoUploadComponent } from 'src/app/photos/photo-upload/photo-upload.component';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.scss'],
})
export class ExperienceEditComponent implements OnInit {
  @ViewChild('photoUpload') photoUpload?: PhotoUploadComponent;

  experienceForm?: FormGroup;
  experience?: Experience;
  user?: User;

  maxDate?: Date;

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
    this.route.params.subscribe(({ id }) => {
      console.log('### ID', id);
      // if (id) {
      //   this.experienceService.getExperience(id).subscribe((project) => {
      //     if (!project) {
      //       this.router.navigateByUrl('/main');
      //     }
      //     this.project = project;
      //     console.log('### project', this.project);
      //     this.fillForm();
      //     this.mode = this.project ? 'EDIT' : 'ADD';
      //     this.initializeUploader(id);
      //   });
      // } else {
      //   this.initializeUploader();
      // }
    });
  }
}
