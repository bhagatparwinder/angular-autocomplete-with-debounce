import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { of } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('addressSearchInput', { static: true })
  addressSearchInput: ElementRef;
  apiResponse: any;
  isSearching: boolean;

  constructor(private httpClient: HttpClient) {
    this.isSearching = false;
    this.apiResponse = [];
  }

  ngOnInit() {
    fromEvent(this.addressSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter((res) => res.length > 2),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.isSearching = true;
        this.searchGetCall(text).subscribe({
          next: (res) => {
            console.log('res', res);
            this.isSearching = false;
            this.apiResponse = res;
          },
          error: (err) => {
            this.isSearching = false;
            console.log('error', err);
          },
        });
      });
  }

  searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }

    // return of([{ error: true }]);
    return of([
      {
        street_line: '142 Park Ave',
        secondary: '',
        city: 'Glendale Heights',
        state: 'IL',
        zipcode: '60108',
        entries: 0,
      },
      {
        street_line: '142 Park Hill Trl',
        secondary: '',
        city: 'Glendale Heights',
        state: 'IL',
        zipcode: '60188',
        entries: 0,
      },
      {
        street_line: '142 Paramount Dr',
        secondary: '',
        city: 'Wood Dale',
        state: 'IL',
        zipcode: '60191',
        entries: 0,
      },
      {
        street_line: '142 Parkview Dr',
        secondary: '',
        city: 'Wauconda',
        state: 'IL',
        zipcode: '60084',
        entries: 0,
      },
      {
        street_line: '142 Parkview Dr',
        secondary: '',
        city: 'Trenton',
        state: 'IL',
        zipcode: '62293',
        entries: 0,
      },
      {
        street_line: '142 S Parkside Ave',
        secondary: '',
        city: 'Glendale Heights',
        state: 'IL',
        zipcode: '60137',
        entries: 0,
      },
      {
        street_line: '142 E Park St',
        secondary: '',
        city: 'Arthur',
        state: 'IL',
        zipcode: '61911',
        entries: 0,
      },
      {
        street_line: '142 N Park Ave',
        secondary: '',
        city: 'Waukegan',
        state: 'IL',
        zipcode: '60085',
        entries: 0,
      },
      {
        street_line: '142 W Park Ave',
        secondary: 'Unit',
        city: 'Sugar Grove',
        state: 'IL',
        zipcode: '60554',
        entries: 4,
      },
      {
        street_line: '142 W Park Ave',
        secondary: '',
        city: 'Collinsville',
        state: 'IL',
        zipcode: '62234',
        entries: 0,
      },
    ]);
  }
}
