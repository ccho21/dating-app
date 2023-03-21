import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { take } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from 'src/app/_models/project';

@Component({
  selector: 'app-profile-projects',
  templateUrl: './profile-projects.component.html',
  styleUrls: ['./profile-projects.component.scss'],
})
export class ProfileProjectsComponent implements OnInit {
  member?: Member;
  user?: User;
  maxDate?: Date;
  projectsForm: FormGroup = this.fb.group({
    projects: this.fb.array([]),
  });

  get projects(): FormArray {
    return this.projectsForm.get('projects') as FormArray;
  }

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private fb: FormBuilder
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user as User));
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.loadMember();
  }

  addProject(project?: Project) {
    let newItem;
    if (project) {
      newItem = this.fb.group({
        ...project,
        projectStarted: new Date(project.projectStarted),
        projectEnded: new Date(project.projectEnded),
      }) as FormGroup;
    } else {
      newItem = this.fb.group({
        name: [''],
        intro: [''],
        projectWith: [''],
        description: [''],
        mainFeature: [''],
        url: [''],
        githubUrl: [''],
        frontEnd: [''],
        backEnd: [''],
        database: [''],
        deployement: [''],
        projectStarted: [''],
        projectEnded: [''],
      }) as FormGroup;
    }
    this.projects.push(newItem);
  }
  loadMember() {
    this.memberService
      .getMember(this.user?.username as string)
      .subscribe((member) => {
        this.member = member;
        this.member.projects.forEach((project: Project) => {
          this.addProject(project);
        });
      });
  }

  updateForm(member: Member) {
    const projectForms = member.projects.map((project) => {
      return this.fb.group({
        ...project,
      }) as FormGroup;
    });

    this.projectsForm.patchValue(projectForms);
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
