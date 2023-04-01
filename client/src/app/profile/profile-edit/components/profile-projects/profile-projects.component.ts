import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { take } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';

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

  btns?: Array<any>;

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user as User));
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.loadMember();

    this.btns = [
      {
        btnLabel: 'Add Project',
        btnLink: '/main/dashboard/projects/create',
        customClass: '',
      },
      {
        btnLabel: 'View All Project',
        btnLink: '/',
        customClass: '',
      },
    ];
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

  deleteProjectForm(projectForm: any, index: number) {
    console.log('### delete project form', projectForm);
    const { id } = projectForm.value;
    if (id) {
      console.log('### existing', index);
      this.projectService.deleteProject(id).subscribe(() => {
        this.projects.removeAt(index);
      });
    } else {
      console.log('### new', index);
      this.projects.removeAt(index);
    }
  }
}
