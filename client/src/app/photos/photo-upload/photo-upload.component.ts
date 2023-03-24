import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { Photo } from 'src/app/_models/photo';

import {
  Gallery,
  GalleryItem,
  ThumbnailsPosition,
  ImageSize,
} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoUploadComponent implements OnInit {
  uploader?: FileUploader;
  user?: User;
  @Input() photos?: Photo[];
  @Input() photo?: Photo;
  @Input() projectId?: number;
  @Input() experienceId?: number;
  @Output() setMain: EventEmitter<Photo> = new EventEmitter<Photo>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() updatePhoto: EventEmitter<Photo> = new EventEmitter<Photo>();

  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;

  //

  items: GalleryItem[] = [];
  imageData: any = [];

  //

  constructor(
    private accountService: AccountService,
    public gallery: Gallery,
    public lightbox: Lightbox
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user as User));
  }

  ngOnInit(): void {
    console.log('### photo came in?');
    this.initializeUploader();

    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }

  getGalerryPhotos() {
    return this.photos?.map((photo: Photo) => ({
      id: photo.id,
      srcUrl: photo.url,
      previewUrl: photo.url,
    }));
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.setMain.emit(photo);
  }

  deletePhoto(photoId: number) {
    this.delete.emit(photoId);
  }

  initializeUploader() {
    console.log('## initializeUploader');

    let url = '';
    if (this.projectId) {
      url = `${this.baseUrl}projects/${this.projectId}/add-photo`;
    } else if (this.experienceId) {
      url = `${this.baseUrl}experiences/${this.experienceId}/add-photo`;
    } else {
      url = `${this.baseUrl}users/add-photo`;
    }

    this.uploader = new FileUploader({
      url: url,
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      console.log('## onAfterAddingFile');

      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      console.log('## onSuccessItem', response);

      const photo: Photo = JSON.parse(response);
      if (this.photos && this.photos.length) {
        this.photos?.push(photo);
      } else {
        this.photo = photo;
      }
      this.updatePhoto.emit(photo);
    };
  }
}
