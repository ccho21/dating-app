import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // {
  //   path: '',
  //   runGuardsAndResolvers: 'always',
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: 'members', component: MemberListComponent },
  //     {
  //       path: 'members/:username',
  //       component: MemberDetailComponent,
  //       resolve: { member: MemberDetailedResolver },
  //     },
  //     {
  //       path: 'member/edit',
  //       component: MemberEditComponent,
  //       canDeactivate: [PreventUnsavedChangesGuard],
  //     },
  //     { path: 'lists', component: ListsComponent },
  //     { path: 'messages', component: MessagesComponent },
  //     {
  //       path: 'admin',
  //       component: AdminPanelComponent,
  //       canActivate: [AdminGuard],
  //     },
  //   ],
  // },
  // { path: 'errors', component: TestErrorsComponent },
  // { path: 'not-found', component: NotFoundComponent },
  // { path: 'server-error', component: ServerErrorComponent },
  // { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
