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

  btns?: Array<any>;

  constructor() {}

  ngOnInit(): void {
    this.maxDate = new Date();

    this.btns = [
      {
        btnLabel: 'Add Project',
        btnLink: '/main/dashboard/projects/create',
        customClass: '',
      },
      {
        btnLabel: 'View All Projects',
        btnLink: '/main/projects',
        customClass: '',
      },
    ];
  }
}
