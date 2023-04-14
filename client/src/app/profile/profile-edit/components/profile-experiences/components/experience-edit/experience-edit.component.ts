import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, Subscriber, mergeMap, of, take } from 'rxjs';
import { Detail, Experience, JobDescription } from 'src/app/_models/experience';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ExperienceService } from 'src/app/_services/experience.service';
import { PhotoUploadComponent } from 'src/app/photos/photo-upload/photo-upload.component';
import { environment } from 'src/environments/environment';

interface Skill {
  id?: number;
  name: string;
}

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

  asyncSelected?: string;
  dataSource?: Observable<any[]>;
  typeaheadLoading?: boolean;
  skills: Skill[] = [];
  noResult: boolean = false;

  statesComplex: any[] = [
    { id: 1, name: 'Alabama', region: 'South' },
    { id: 2, name: 'Alaska', region: 'West' },
    { id: 3, name: 'Arizona', region: 'West' },
    { id: 4, name: 'Arkansas', region: 'South' },
    { id: 5, name: 'California', region: 'West' },
    { id: 6, name: 'Colorado', region: 'West' },
    { id: 7, name: 'Connecticut', region: 'Northeast' },
    { id: 8, name: 'Delaware', region: 'South' },
    { id: 9, name: 'Florida', region: 'South' },
    { id: 10, name: 'Georgia', region: 'South' },
    { id: 11, name: 'Hawaii', region: 'West' },
    { id: 12, name: 'Idaho', region: 'West' },
    { id: 13, name: 'Illinois', region: 'Midwest' },
    { id: 14, name: 'Indiana', region: 'Midwest' },
    { id: 15, name: 'Iowa', region: 'Midwest' },
    { id: 16, name: 'Kansas', region: 'Midwest' },
    { id: 17, name: 'Kentucky', region: 'South' },
    { id: 18, name: 'Louisiana', region: 'South' },
    { id: 19, name: 'Maine', region: 'Northeast' },
    { id: 21, name: 'Maryland', region: 'South' },
    { id: 22, name: 'Massachusetts', region: 'Northeast' },
    { id: 23, name: 'Michigan', region: 'Midwest' },
    { id: 24, name: 'Minnesota', region: 'Midwest' },
    { id: 25, name: 'Mississippi', region: 'South' },
    { id: 26, name: 'Missouri', region: 'Midwest' },
    { id: 27, name: 'Montana', region: 'West' },
    { id: 28, name: 'Nebraska', region: 'Midwest' },
    { id: 29, name: 'Nevada', region: 'West' },
    { id: 30, name: 'New Hampshire', region: 'Northeast' },
    { id: 31, name: 'New Jersey', region: 'Northeast' },
    { id: 32, name: 'New Mexico', region: 'West' },
    { id: 33, name: 'New York', region: 'Northeast' },
    { id: 34, name: 'North Dakota', region: 'Midwest' },
    { id: 35, name: 'North Carolina', region: 'South' },
    { id: 36, name: 'Ohio', region: 'Midwest' },
    { id: 37, name: 'Oklahoma', region: 'South' },
    { id: 38, name: 'Oregon', region: 'West' },
    { id: 39, name: 'Pennsylvania', region: 'Northeast' },
    { id: 40, name: 'Rhode Island', region: 'Northeast' },
    { id: 41, name: 'South Carolina', region: 'South' },
    { id: 42, name: 'South Dakota', region: 'Midwest' },
    { id: 43, name: 'Tennessee', region: 'South' },
    { id: 44, name: 'Texas', region: 'South' },
    { id: 45, name: 'Utah', region: 'West' },
    { id: 46, name: 'Vermont', region: 'Northeast' },
    { id: 47, name: 'Virginia', region: 'South' },
    { id: 48, name: 'Washington', region: 'South' },
    { id: 49, name: 'West Virginia', region: 'South' },
    { id: 50, name: 'Wisconsin', region: 'Midwest' },
    { id: 51, name: 'Wyoming', region: 'West' },
  ];

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

    this.dataSource = new Observable((observer: Subscriber<string>) => {
      // Runs on every search
      observer.next(this.skillForm.value);
    }).pipe(mergeMap((token: string) => this.getStatesAsObservable(token)));
  }

  get jobDescriptions(): FormArray {
    return this.experienceForm?.get('jobDescriptions') as FormArray;
  }
  get skillForm(): FormControl {
    return this.experienceForm?.get('skills') as FormControl;
  }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(({ id }) => {
      console.log('### ID', id);
      if (id) {
        this.experienceService.getExperience(id).subscribe((experience) => {
          this.experience = experience;
          console.log('### experience', this.experience);
          this.fillForm();
          this.mode = this.experience ? 'EDIT' : 'ADD';
          this.initializeUploader(id);
        });
      } else {
        this.initForm();
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
      started: [new Date()],
      ended: [null],
      logo: [''],
      skills: [''],
    });
  }

  private fillForm(): void {
    if (this.experience) {
      this.experienceForm?.patchValue({
        ...this.experience,
        started: new Date(this.experience.started),
        ended: new Date(this.experience.ended),
      });

      console.log('### this.experience', this.experienceForm?.value);

      const { jobDescriptions } = this.experience;
      this.addJobDescriptions(jobDescriptions);
    }
  }

  addJobDescriptions(jobDescriptions: JobDescription[]) {
    console.log('#### addJobDescriptions ####');
    console.log('#### jobDescriptions ', jobDescriptions);

    jobDescriptions.forEach((jd: JobDescription, i: number) => {
      console.log('### job descriptions! ', jobDescriptions);
      let newItem = this.fb.group({
        ...jd,
        started: [new Date(jd.started)],
        ended: [new Date(jd.ended)],
      });

      this.jobDescriptions.push(newItem);

      // For Child
      // const { details } = jd;
      // this.addDetails(details, i);
    });
  }

  addDetails(details: Detail[], i: number) {
    const dFormArray = this.jobDescriptions.at(i).get('details') as FormArray;

    console.log('#### addDetails ####');
    console.log('#### details ', details);
    console.log('#### jdIndex: ', i);

    // details.forEach((d) => {
    //   let newItem = this.fb.group({
    //     ...d,
    //   });
    //   dFormArray.push(newItem);
    // });
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

  getStatesAsObservable(token: string): Observable<any[]> {
    console.log('### token', token);
    const query = new RegExp(token, 'i');

    return of(
      this.statesComplex.filter((state: any) => {
        return query.test(state.name);
      })
    );
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
    if (e.value) {
      const newSkill = e.value;
      const skillIndex = this.skills.findIndex(
        (skill: Skill) => skill.name === newSkill
      );

      if (skillIndex === -1 && newSkill) {
        this.skills.push({ name: newSkill });
      }
      this.resetSkill();
    }
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  addSkill() {
    if (this.skillForm.value) {
      const id = this.statesComplex.length;
      this.statesComplex.push({
        id: id as number,
        name: this.skillForm.value,
        region: '',
      });

      this.skills.push({ name: this.skillForm.value });
      this.resetSkill();
    }
  }

  deleteSkill(skill: Skill) {
    this.skills = this.skills.filter(
      (x: Skill) => x.name.toLowerCase() !== skill.name.toLowerCase()
    );
  }

  resetSkill() {
    this.skillForm.reset();
    this.noResult = false;
  }
}
