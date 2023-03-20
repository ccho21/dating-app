import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { MemberMessagesComponent } from './messages/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { LoginComponent } from './login/login.component';
import { SwiperModule } from 'swiper/angular';
import { FormControlPipe } from './_pipes/form-control.pipe';
import { FormGroupPipe } from './_pipes/form-group.pipe';
import { MemberSearchComponent } from './members/member-search/member-search.component';
import { MessagesComponent } from './messages/messages/messages.component';
import { MessageOverviewComponent } from './messages/message-overview/message-overview.component';
import { ConnectionOverviewComponent } from './connections/connection-overview/connection-overview.component';
import { MemberComponent } from './members/member/member.component';
import { ConnectionCardComponent } from './connections/connection-card/connection-card.component';
import { NoDataComponent } from './no-data/no-data/no-data.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectOverviewComponent } from './projects/project-overview/project-overview.component';
import { VisitorOverviewComponent } from './visitors/visitor-overview/visitor-overview.component';

import { SlicePipe } from '@angular/common';
import { ExperienceListComponent } from './experiences/experience-list/experience-list.component';
import { ExperienceComponent } from './experiences/experience/experience.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { TextareaInputComponent } from './_forms/textarea-input/textarea-input.component';
import { ProfileAboutComponent } from './profile/profile-edit/components/profile-about/profile-about.component';
import { ProfileProjectsComponent } from './profile/profile-edit/components/profile-projects/profile-projects.component';
import { ProfileExperiencesComponent } from './profile/profile-edit/components/profile-experiences/profile-experiences.component';
import { ProfileSkillsComponent } from './profile/profile-edit/components/profile-skills/profile-skills.component';
import { ProfilePhotosComponent } from './profile/profile-edit/components/profile-photos/profile-photos.component';
import { ProjectEditComponent } from './profile/profile-edit/components/profile-projects/components/project-edit/project-edit.component';
import { ExperienceEditComponent } from './profile/profile-edit/components/profile-experiences/components/experience-edit/experience-edit.component';
import { JobDescriptionEditComponent } from './profile/profile-edit/components/profile-experiences/components/job-description-edit/job-description-edit.component';
import { JobDetailEditComponent } from './profile/profile-edit/components/profile-experiences/components/job-detail-edit/job-detail-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    ConfirmDialogComponent,
    LoginComponent,
    FormControlPipe,
    FormGroupPipe,
    MemberSearchComponent,
    ProfileComponent,
    MessagesComponent,
    MessageOverviewComponent,
    ConnectionOverviewComponent,
    MemberComponent,
    ConnectionCardComponent,
    NoDataComponent,
    ProjectListComponent,
    ProjectComponent,
    ProjectOverviewComponent,
    VisitorOverviewComponent,
    ExperienceListComponent,
    ExperienceComponent,
    ProfileEditComponent,
    TextareaInputComponent,
    ProfileAboutComponent,
    ProfileProjectsComponent,
    ProfileExperiencesComponent,
    ProfileSkillsComponent,
    ProfilePhotosComponent,
    ProjectEditComponent,
    ExperienceEditComponent,
    JobDescriptionEditComponent,
    JobDetailEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SwiperModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    SlicePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
