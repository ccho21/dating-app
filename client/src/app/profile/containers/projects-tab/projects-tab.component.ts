import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Project } from 'src/app/_models/project';
import { ProjectParams } from 'src/app/_models/projectParams';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-projects-tab',
  templateUrl: './projects-tab.component.html',
  styleUrls: ['./projects-tab.component.scss'],
})
export class ProjectsTabComponent implements OnInit {
  projects: Project[] = [];
  user?: User;

  constructor(
    private projectService: ProjectService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    this.getProjects();
  }

  private getProjects(): void {
    const params: ProjectParams = this.projectService.getProjectParams();
    params.currentUsername = this.user?.username || undefined;

    this.projectService.getProjects(params).subscribe((res) => {
      this.projects = res.result as Project[];
    });
  }

  ngOnDestroy(): void {
    console.log('### project destroyed');
  }
}
