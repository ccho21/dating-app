import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { Member, MemberForm } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Photo } from 'src/app/_models/photo';
import { PhotoUploadComponent } from 'src/app/photos/photo-upload/photo-upload.component';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss'],
})
export class ProfileAboutComponent implements OnInit, OnDestroy {
  // @ViewChild('editForm') editForm?: NgForm;
  @ViewChild('photoUpload') photoUpload?: PhotoUploadComponent;
  baseUrl = environment.apiUrl;

  member?: Member;
  user?: User;
  userSub$?: Subscription;

  activeTab?: number;

  uploaderReady: boolean = false;
  photos: Photo[] = [];
  loading?: boolean;

  editForm: FormGroup = this.fb.group({
    gender: ['male'],
    name: [''],
    dateOfBirth: [''],
    city: [''],
    country: [''],
    introduction: [''],
    lookingFor: [''],
    interests: [''],
    website: [''],
  });

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    console.log('### event', $event);
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.userSub$ = this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user as User));
  }
  ngOnDestroy(): void {
    this.userSub$!.unsubscribe();
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService
      .getMember(this.user?.username as string)
      .subscribe((member) => {
        this.member = member;
        this.updateForm(this.member);
      });
  }

  updateForm(member: Member) {
    const { interests, lookingFor, city, country, gender, introduction, name } =
      member;

    this.editForm?.patchValue({
      name,
      interests,
      lookingFor,
      city,
      country,
      gender,
      introduction,
    });

    console.log('### this.register form', this.editForm?.value);
  }

  updateMember() {
    console.log('### update member');

    const { name, interests, lookingFor, city, country, gender, introduction } =
      this.editForm.value;
    const form: MemberForm = {
      name,
      interests,
      lookingFor,
      city,
      country,
      gender,
      introduction,
    };
    this.memberService.updateMember(form).subscribe({
      next: () => {
        this.updateImages(this.member?.id as number);

        this.toastr.success('Project has been created successfully');
        this.router.navigate(['main']);
        this.editForm?.reset(this.member);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  updateImages(id: number) {
    if (id) {
      const url = `${this.baseUrl}users/add-photo`;
      this.photoUpload?.updateUrl(url);
      this.photoUpload?.uploadAll();
    }
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      if (this.user && this.member) {
        this.user.photoUrl = photo.url;
        this.accountService.setCurrentUser(this.user);

        //TODO: NGRX
        this.member.photoUrl = photo.url;
        this.member.photos.forEach((p) => {
          if (p.isMain) p.isMain = false;
          if (p.id === photo.id) p.isMain = true;
        });
      }
    });
  }

  updatePhoto(photo: Photo) {
    //TODO: NGRX
    if (photo && this.user && this.member) {
      if (photo.isMain) {
        this.user.photoUrl = photo.url;
        this.member.photoUrl = photo.url;
        this.accountService.setCurrentUser(this.user);
      }
    }
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      if (this.member) {
        //TODO: NGRX
        this.member.photos = this.member.photos.filter((x) => x.id !== photoId);
      }
    });
  }
}
