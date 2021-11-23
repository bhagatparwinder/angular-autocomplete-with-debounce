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
          }
        });
      });
  }

  searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
    // return this.httpClient.get();
    return of([]);
  }
}
