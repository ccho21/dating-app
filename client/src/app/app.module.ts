import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ICON MODULE

import { CommonModule } from '@angular/common';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { TabsModule } from 'ngx-bootstrap/tabs';

// Bootstrap module
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/containers/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
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
import { MessagesComponent } from './messages/messages/messages.component';
import { MemberComponent } from './members/components/member/member.component';
import { ConnectionCardComponent } from './connections/components/connection-card/connection-card.component';
import { ProjectListComponent } from './projects/containers/project-list/project-list.component';
import { ProjectComponent } from './projects/components/project/project.component';

import { SlicePipe } from '@angular/common';
import { ExperienceComponent } from './experiences/components/experience/experience.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { TextareaInputComponent } from './_forms/textarea-input/textarea-input.component';
import { ProfileAboutComponent } from './profile/profile-edit/components/profile-about/profile-about.component';
import { ProfileProjectsComponent } from './profile/profile-edit/components/profile-projects/profile-projects.component';
import { ProfileExperiencesComponent } from './profile/profile-edit/components/profile-experiences/profile-experiences.component';
import { ProfileSkillsComponent } from './profile/profile-edit/components/profile-skills/profile-skills.component';
import { ProjectEditComponent } from './profile/profile-edit/components/profile-projects/components/project-edit/project-edit.component';
import { ExperienceEditComponent } from './profile/profile-edit/components/profile-experiences/components/experience-edit/experience-edit.component';
import { JobDescriptionEditComponent } from './profile/profile-edit/components/profile-experiences/components/job-description-edit/job-description-edit.component';
import { JobDetailEditComponent } from './profile/profile-edit/components/profile-experiences/components/job-detail-edit/job-detail-edit.component';
import { PhotoUploadComponent } from './photos/photo-upload/photo-upload.component';
import { ButtonComponent } from './_forms/button/button.component';
import { PanelComponent } from './_layouts/panel/panel.component';
import { FooterComponent } from './_layouts/footer/footer.component';
import { MainComponent } from './main/main/main.component';
import { HeaderComponent } from './_layouts/header/header.component';
import { LinkComponent } from './_forms/link/link.component';
import { OverviewTabComponent } from './profile/containers/overview-tab/overview-tab.component';
import { DynamicComponentComponent } from './_layouts/dynamic-component/dynamic-component.component';
import { DropdownLinkComponent } from './_forms/dropdown-link/dropdown-link.component';
import { SideNavComponent } from './_layouts/side-nav/side-nav.component';
import { ProjectTableComponent } from './projects/components/project-table/project-table.component';
import { SearchComponent } from './_layouts/search/search.component';
import { ProjectCardComponent } from './projects/components/project-card/project-card.component';
import { TruncatePipe } from './_pipes/truncate.pipe';
import { ProjectsComponent } from './projects/components/projects/projects.component';
import { ProjectsTabComponent } from './profile/containers/projects-tab/projects-tab.component';
import { ConnectionSmComponent } from './connections/components/connection-sm/connection-sm.component';
import { ExperienceTabComponent } from './profile/containers/experience-tab/experience-tab.component';
import { NoDataComponent } from './_layouts/no-data/no-data.component';
import { MemberCardComponent } from './members/components/member-card/member-card.component';
import { MemberSearchComponent } from './members/components/member-search/member-search.component';
import { AboutComponent } from './about/about/about.component';
import { MessageMembersComponent } from './messages/message-members/message-members.component';
import { MessageEmptyComponent } from './messages/message-empty/message-empty.component';
import { LoaderComponent } from './_layouts/loader/loader.component';
import { MessageOverviewComponent } from './profile/containers/overview-tab/containers/message-overview/message-overview.component';
import { ConnectionOverviewComponent } from './profile/containers/overview-tab/connection-overview/connection-overview.component';
import { ProjectOverviewComponent } from './profile/containers/overview-tab/containers/project-overview/project-overview.component';
import { ExperienceOverviewComponent } from './profile/containers/overview-tab/containers/experience-overview/experience-overview.component';
import { VisitorOverviewComponent } from './profile/containers/overview-tab/containers/visitor-overview/visitor-overview.component';
import { ExperienceCardComponent } from './experiences/components/experience-card/experience-card.component';
import { MemberCardOneComponent } from './members/components/member-card-one/member-card-one.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
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

    MemberComponent,
    ConnectionCardComponent,
    ProjectListComponent,
    ProjectComponent,
    ExperienceComponent,
    ProfileEditComponent,
    TextareaInputComponent,
    ProfileAboutComponent,
    ProfileProjectsComponent,
    ProfileExperiencesComponent,
    ProfileSkillsComponent,
    ProjectEditComponent,
    ExperienceEditComponent,
    JobDescriptionEditComponent,
    JobDetailEditComponent,
    PhotoUploadComponent,
    ButtonComponent,
    PanelComponent,
    FooterComponent,
    MainComponent,
    HeaderComponent,
    LinkComponent,
    OverviewTabComponent,
    DynamicComponentComponent,
    DropdownLinkComponent,
    SideNavComponent,
    ProjectTableComponent,
    ProjectCardComponent,
    SearchComponent,
    TruncatePipe,
    ProjectsComponent,
    ProjectsTabComponent,
    ConnectionSmComponent,
    ExperienceTabComponent,
    NoDataComponent,
    AboutComponent,
    MessageMembersComponent,
    MessageEmptyComponent,
    LoaderComponent,
    MessageOverviewComponent,
    ConnectionOverviewComponent,
    ProjectOverviewComponent,
    ExperienceOverviewComponent,
    VisitorOverviewComponent,
    ExperienceCardComponent,
    MemberCardOneComponent,
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
    CommonModule,

    BsDropdownModule,
    CollapseModule,
    TabsModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),

    GalleryModule.withConfig({
      // thumbView: 'contain',
    }),
    LightboxModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    SlicePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
