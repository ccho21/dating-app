import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { Project } from 'src/app/_models/project';
import { ProjectParams } from 'src/app/_models/projectParams';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({});
  @Output() paramsEmit = new EventEmitter<ProjectParams>();
  projectParams: ProjectParams = {
    pageNumber: 0,
    pageSize: 10,
    orderBy: 'projectStarted',
    keyword: '',
  };

  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  constructor(private memberService: MemberService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      keyword: ['', [Validators.required]],
    });
  }

  resetFilters() {
    // this.userParams = this.memberService.resetUserParams();
    // this.loadMembers();
  }

  pageChanged(event: any) {
    // if (this.userParams && this.userParams?.pageNumber !== event.page) {
    //   this.userParams.pageNumber = event.page;
    //   this.memberService.setUserParams(this.userParams);
    //   this.loadMembers();
    // }
  }
  submit() {
    if (this.searchForm) {
      console.log('### working', this.searchForm.value);
      const keyword = this.searchForm.get('keyword')?.value;
      this.projectParams.keyword = keyword;
      this.paramsEmit.emit(this.projectParams);
    }
  }
}
