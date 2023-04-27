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
import { Skill } from 'src/app/_models/skill';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ExperienceService } from 'src/app/_services/experience.service';
import { SkillService } from 'src/app/_services/skill.service';
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
  mode?: string = 'ADD';

  maxDate?: Date;

  asyncSelected?: string;
  dataSource?: Observable<any[]>;
  typeaheadLoading?: boolean;
  skills: Skill[] = [];
  noResult: boolean = false;
  statesComplex: any[] = [];
  uploaderReady: boolean = false;
  id?: number;

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
    private accountService: AccountService,
    private skillService: SkillService
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
    return this.experienceForm?.get('skill') as FormControl;
  }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(({ id }) => {
      console.log('### ID', id);
      if (id) {
        this.id = id;
        this.experienceService.getExperience(id).subscribe((experience) => {
          const { skills } = experience;
          this.experience = experience;
          this.skills = skills.slice();
          console.log('### experience', this.experience);
          this.fillForm();
          this.mode = 'EDIT';
          this.uploaderReady = true;
        });
      } else {
        this.uploaderReady = true;
      }
    });

    this.skillService.getSkills().subscribe((res) => {
      console.log('### :) ', res);
      this.statesComplex = res.slice();
    });
  }
  public saveExperience(): void {
    const { ended, started, jobDescriptions } = this.experienceForm?.value;
    console.log('### this. experience form', this.experienceForm?.value);
    const form: Experience = {
      id: this.id,
      ...this.experienceForm?.value,
      started: new Date(started).toISOString(),
      ended: new Date(ended).toISOString(),
      jobDescriptions: jobDescriptions.map((jd: JobDescription) => ({
        ...jd,
        started: new Date(started).toISOString(),
        ended: new Date(ended).toISOString(),
      })),
      skills: this.skills.map((x) => ({ ...x })),
    };

    if (this.mode === 'EDIT') {
      this.updateExperience(form);
    } else {
      this.createExperience(form);
    }
  }

  updateExperience(form: Experience) {
    this.experienceService.updateExperience(form, form.id).subscribe((res) => {
      console.log('### update experience result', res);
      this.updateImages(res.id);
    });
  }

  createExperience(form: Experience) {
    this.experienceService
      .createExperience(form)
      .subscribe((res: Experience) => {
        console.log('### update experience result', res);
        this.updateImages(res.id);
      });
  }

  updateImages(id: number) {
    if (id) {
      const url = `${this.baseUrl}experiences/${id}/add-photo`;
      this.photoUpload?.updateUrl(url);
      this.photoUpload?.uploadAll();
    }
  }

  private initForm(): void {
    this.experienceForm = this.fb.group({
      intro: ['Hello everyone I am charles.'],
      position: ['Front-end Developer'],
      companyName: ['Guidelines advertising'],
      jobDescriptions: this.fb.array([]),
      url: ['google.ca'],
      started: [new Date()],
      ended: [new Date()],
      skill: [''],
    });

    const jdForm = this.fb.group({
      description: ['Simple job description about guidelnies advertising'],
      position: ['Web developer'],
      started: [new Date()],
      ended: [new Date()],
      details: [
        'I was working as a web developer for 2 years and I was working on developing a variety of websites that promotes the pre-construction condos and houses',
      ],
    });
    this.jobDescriptions.push(jdForm);
  }

  private fillForm(): void {
    if (this.experience) {
      this.experienceForm?.patchValue({
        ...this.experience,
        started: new Date(this.experience.started),
        ended: new Date(this.experience.ended),
      });

      const { jobDescriptions } = this.experience;
      this.addJobDescriptions(jobDescriptions);
    }
  }

  addJobDescriptions(jobDescriptions: JobDescription[]) {
    jobDescriptions.forEach((jd: JobDescription, i: number) => {
      let newItem = this.fb.group({
        ...jd,
        started: [new Date(jd.started)],
        ended: [new Date(jd.ended)],
      });

      this.jobDescriptions.push(newItem);
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
      const skillIndex = this.skills.findIndex(
        (skill: Skill) => skill.name === e.value
      );

      if (skillIndex === -1 && e.value) {
        const newSkill: Skill = this.statesComplex.find(
          (skill) => skill.name.toLowerCase() === e.value.toLowerCase()
        );
        this.skills.push(newSkill);
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
      const skillForm: Skill = {
        name: this.skillForm.value,
      };

      this.skillService.createSkill(skillForm).subscribe((res) => {
        this.skills.push(res);
        this.statesComplex.push(res);
      });

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
