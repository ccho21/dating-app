import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/_services/member.service';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { User } from 'src/app/_models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.scss'],
})
export class MemberSearchComponent implements OnInit {
  @Output() paramsEmit = new EventEmitter<UserParams>();
  searchForm: FormGroup = new FormGroup({});
  members?: Member[];
  pagination?: Pagination;
  userParams: UserParams = new UserParams();

  user?: User;

  searchList = [
    { value: 'username', display: 'Username' },
    { value: 'name', display: 'Name' },
    { value: 'education', display: 'Education' },
    { value: 'position', display: 'Position' },
  ];

  orderList = [
    { value: '', display: 'Sort by' },
    { value: 'lastActive', display: 'Last Active' },
    { value: 'username', display: 'Username' },
  ];

  constructor(private memberService: MemberService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // members should be filtered by name, job, education skills,
    this.searchForm = this.fb.group({
      keyword: [''],
      search: ['username', [Validators.required]],
      orderBy: [''],
    });

    this.searchForm.get('orderBy')?.valueChanges.subscribe((change) => {
      if (change) {
        this.userParams.orderBy = change;
        this.paramsEmit.emit(this.userParams);
      }
    });
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
  }

  submit() {
    if (this.searchForm) {
      console.log('### this.search form', this.searchForm);
      const selectedSearch: string = this.searchForm.get('search')?.value;
      const keyword: string = this.searchForm.get('keyword')?.value;

      if (!selectedSearch || !keyword) {
        alert('search and keyword should be entered');
        return;
      }

      if (this.userParams) {
        switch (selectedSearch) {
          case 'username':
            this.userParams.username = keyword;
            break;
        }
      }

      console.log('### user params,', this.userParams);
      this.paramsEmit.emit(this.userParams);
    }
  }

  ngOnDestroy(): void {
    this.searchForm.reset();
    this.memberService.resetUserParams();
  }
}
