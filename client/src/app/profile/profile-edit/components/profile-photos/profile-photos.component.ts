import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { MemberService } from 'src/app/_services/member.service';
import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-profile-photos',
  templateUrl: './profile-photos.component.html',
  styleUrls: ['./profile-photos.component.scss'],
})
export class ProfilePhotosComponent implements OnInit {
  @Input() member?: Member;
  photos: Photo[] = [];
  uploader?: FileUploader;
  user?: User;

  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(
    private accountService: AccountService,
    private memberService: MemberService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user as User));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService
      .getMember(this.user?.username as string)
      .subscribe((member) => {
        this.member = member;
      });
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
