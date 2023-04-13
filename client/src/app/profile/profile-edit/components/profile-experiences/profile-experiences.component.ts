import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { take } from 'rxjs/operators';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Detail, Experience, JobDescription } from 'src/app/_models/experience';
@Component({
  selector: 'app-profile-experiences',
  templateUrl: './profile-experiences.component.html',
  styleUrls: ['./profile-experiences.component.scss'],
})
export class ProfileExperiencesComponent implements OnInit {
  member?: Member;
  user?: User;
  maxDate?: Date;
  experiencesForm: FormGroup = this.fb.group({
    experiences: this.fb.array([]),
  });

  get experiences(): FormArray {
    return this.experiencesForm.get('experiences') as FormArray;
  }

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user as User));
  }

  ngOnInit(): void {
    console.log('### experience');
    this.maxDate = new Date();
    this.loadMember();
  }

  addExperience(experience: Experience, eIndex: number) {
    let newItem;
    if (experience) {
      const { jobDescriptions } = experience;
      newItem = this.fb.group({
        ...experience,
        started: new Date(experience.started),
        ended: new Date(experience.ended),
        jobDescriptions: this.fb.array([]),
      }) as FormGroup;

      this.experiences.push(newItem);
      this.addJobDescriptions(jobDescriptions, eIndex);
    }

    // else {
    //   newItem = this.fb.group({
    //     id: [''],
    //     intro: [''],
    //     position: [''],
    //     companyName: [''],
    //     jobDescriptions: this.fb.array([]),
    //     url: [''],
    //     appUserId: [''],
    //     started: [''],
    //     ended: [''],
    //     logo: [''],
    //   }) as FormGroup;
    //   this.experiences.push(newItem);
    // }
  }

  addJobDescriptions(jobDescriptions: JobDescription[], eIndex: number) {
    console.log('#### addJobDescriptions ####');
    console.log('#### jobDescriptions ', jobDescriptions);
    console.log('#### eIndex: ', eIndex);
    const jdFormArray = this.experiences
      .at(eIndex)
      .get('jobDescriptions') as FormArray;

    jobDescriptions.forEach((jd: JobDescription, jdIndex: number) => {
      console.log('### job descriptions! ', jobDescriptions);
      let newItem = this.fb.group({
        ...jd,
        details: this.fb.array([]),
      });
      jdFormArray.push(newItem);

      // For Child
      const { details } = jd;
      this.addDetails(details, eIndex, jdIndex);
    });
  }

  addDetails(details: Detail[], eIndex: number, jdIndex: number) {
    const jdFormArray = this.experiences
      .at(eIndex)
      .get('jobDescriptions') as FormArray;
    const dFormArray = jdFormArray.at(jdIndex).get('details') as FormArray;

    console.log('#### addDetails ####');
    console.log('#### details ', details);
    console.log('#### eIndex: ', eIndex);
    console.log('#### jdIndex: ', jdIndex);

    details.forEach((d) => {
      let newItem = this.fb.group({
        ...d,
      });
      dFormArray.push(newItem);
    });
  }

  loadMember() {
    this.memberService
      .getMember(this.user?.username as string)
      .subscribe((member: Member) => {
        this.member = member;
        this.member.experiences.forEach((experience: Experience, i: number) => {
          console.log('### START #######');
          console.log('### experience', experience);
          console.log('### i', i);
          this.addExperience(experience, i);
        });
        console.log('### experience form', this.experiences);
      });
  }

  updateForm(member: Member) {
    // const experienceForms = member.experiences.map((experience) => {
    //   return this.fb.group({
    //     // ...experience,
    //   }) as FormGroup;
    // });
    // this.experiencesForm.patchValue(experienceForms);
  }

  updateExperience() {
    // this.memberService.updateMember(this.member as Member).subscribe(() => {
    //   this._snackBar.open(`Profile updated successfully`, 'okay', {
    //     duration: 5000,
    //     verticalPosition: 'bottom',
    //   });
    //   this.experiencesForm?.reset(this.member);
    // });
  }
}
