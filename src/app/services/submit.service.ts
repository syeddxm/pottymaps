import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {

  submitMode = new Subject<boolean>();

  submitPosition = {
    lat: 0,
    lng: 0
  };

  constructor(private router: Router) {
    this.disableSubmitMode();
  }

  enableSubmitMode(): Promise<void> {
    return new Promise( (resolve, reject) => {
      this.submitMode.next(true);
      resolve();
    });
  }

  disableSubmitMode() {
    this.submitMode.next(false);
    this.submitPosition = { lat: 0, lng: 0};
  }

  submit(lat, lng) {
    this.submitPosition = { lat, lng};
    this.router.navigate(['/submit/']);
  }
}
