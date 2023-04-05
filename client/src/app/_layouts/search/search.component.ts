import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pagination } from 'src/app/_models/pagination';
import { Project } from 'src/app/_models/project';
import { ProjectParams } from 'src/app/_models/projectParams';
import { MemberService } from 'src/app/_services/member.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup = new FormGroup({});
  @Output() paramsEmit = new EventEmitter<ProjectParams>();
  maxDate?: Date;
  projectParams: ProjectParams = new ProjectParams();

  searchList = [
    { value: 'title', display: 'Title' },
    { value: 'currentUsername', display: 'Username' },
  ];

  orderList = [
    { value: '', display: 'Sort by' },
    { value: 'projectDate', display: 'Newest Projects' },
    { value: 'title', display: 'Title' },
    { value: 'username', display: 'Username' },
  ];
  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.maxDate = new Date();

    this.searchForm = this.fb.group({
      keyword: [''],
      search: ['title', [Validators.required]],
      projectStarted: [null],
      orderBy: [''],
    });

    this.searchForm.get('orderBy')?.valueChanges.subscribe((change) => {
      if (change) {
        this.projectParams.orderBy = change;
        this.paramsEmit.emit(this.projectParams);
      }
    });
  }
  onDateChange(date: Date) {
    if (date && this.projectParams) {
      date.setHours(0, 0, 0);
      this.projectParams.minDate = date.toISOString();
      this.paramsEmit.emit(this.projectParams);
    }
  }

  submit() {
    if (this.searchForm) {
      const selectedSearch: string = this.searchForm.get('search')?.value;
      const keyword: string = this.searchForm.get('keyword')?.value;

      if (!selectedSearch || !keyword) {
        alert('search and keyword should be entered');
        return;
      }

      if (this.projectParams) {
        switch (selectedSearch) {
          case 'title':
            this.projectParams.title = keyword;
            break;
          case 'currentUsername':
            this.projectParams.currentUsername = keyword;
            break;
          case 'company':
            this.projectParams.company = keyword;
            break;
        }
      }

      this.paramsEmit.emit(this.projectParams);

      this.resetForm();
    }
  }

  resetForm() {
    // Reset form controls
    // this.searchForm.get('keyword')?.reset();
  }

  ngOnDestroy(): void {
    this.searchForm.reset();
    this.projectService.resetProjectParams();
  }
}
