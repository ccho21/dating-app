import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/containers/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './_guards/admin.guard';
import { MemberMessagesComponent } from './messages/member-messages/member-messages.component';
import { MessagesComponent } from './messages/messages/messages.component';
import { MemberResolver } from './_resolvers/member.resolver';
import { MemberComponent } from './members/components/member/member.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileAboutComponent } from './profile/profile-edit/components/profile-about/profile-about.component';
import { ProfileProjectsComponent } from './profile/profile-edit/components/profile-projects/profile-projects.component';
import { ProfileExperiencesComponent } from './profile/profile-edit/components/profile-experiences/profile-experiences.component';
import { ProfileSkillsComponent } from './profile/profile-edit/components/profile-skills/profile-skills.component';
import { MainComponent } from './main/main/main.component';
import { ProjectEditComponent } from './profile/profile-edit/components/profile-projects/components/project-edit/project-edit.component';
import { ProjectListComponent } from './projects/containers/project-list/project-list.component';
import { ProjectComponent } from './projects/components/project/project.component';
import { ExperienceEditComponent } from './profile/profile-edit/components/profile-experiences/components/experience-edit/experience-edit.component';
import { NoDataComponent } from './_layouts/no-data/no-data.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'main',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    component: MainComponent,

    children: [
      { path: '', component: ProfileComponent },
      {
        path: 'members',
        component: MemberListComponent,
      },
      {
        path: 'members/:username',
        component: MemberComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        resolve: { member: MemberResolver },
      },
      { path: 'dashboard', redirectTo: 'dashboard/about' },
      {
        path: 'dashboard',
        component: ProfileEditComponent,
        children: [
          {
            path: 'about',
            component: ProfileAboutComponent,
            canDeactivate: [PreventUnsavedChangesGuard],
          },
          {
            path: 'projects',
            component: ProfileProjectsComponent,
          },
          {
            path: 'projects/create',
            component: ProjectEditComponent,
          },
          {
            path: 'projects/:id',
            component: ProjectEditComponent,
          },
          { path: 'experiences', component: ProfileExperiencesComponent },
          {
            path: 'experiences/create',
            component: ExperienceEditComponent,
          },
          {
            path: 'experiences/:id',
            component: ExperienceEditComponent,
          },
          { path: 'skills', component: ProfileSkillsComponent },
        ],
      },
      {
        path: 'projects',
        component: ProjectListComponent,
        children: [{ path: '', component: NoDataComponent }],
      },
      {
        path: 'projects/:id',
        component: ProjectComponent,
        children: [{ path: '', component: NoDataComponent }],
      },
      {
        path: 'messages',
        component: MessagesComponent,
        children: [
          { path: '', component: NoDataComponent },
          { path: ':membername', component: MemberMessagesComponent },
        ],
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [AdminGuard],
      },
    ],
  },

  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
