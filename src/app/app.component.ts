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

const APIKEY = 'e8067b53';

const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*',
  },
});

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
          return event.target.value; // get value
        }),
        filter((res) => res.length > 2), // if character length greater then 2
        debounceTime(1000), // Time in milliseconds between key events
        distinctUntilChanged() // If previous query is diffent from current
      )
      .subscribe((text: string) => {
        this.isSearching = true;

        this.searchGetCall(text).subscribe(
          (res) => {
            console.log('res', res);
            this.isSearching = false;
            this.apiResponse = res;
          },
          (err) => {
            this.isSearching = false;
            console.log('error', err);
          }
        );
      });
  }

  searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.httpClient.get(
      'http://www.omdbapi.com/?s=' + term + '&apikey=' + APIKEY,
      { params: PARAMS.set('search', term) }
    );
  }
}
