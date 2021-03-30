import { Injectable } from '@angular/core';
import { GeofireService } from './geofire.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  labelToggled = new Subject<any>();

  constructor(private geofireService: GeofireService) { }



  clicked(item) {
    switch (item) {
      case 'fav':
        this.geofireService.sortOptions.favourite = !this.geofireService.sortOptions.favourite;
        this.labelToggled.next({id: 0, value: this.geofireService.sortOptions.favourite});
        break;
      case 'open':
        this.geofireService.sortOptions.open = !this.geofireService.sortOptions.open;
        this.labelToggled.next({id: 1, value: this.geofireService.sortOptions.open});
        break;
      case 'changing':
        this.geofireService.sortOptions.changingTable = !this.geofireService.sortOptions.changingTable;
        this.labelToggled.next({id: 2, value: this.geofireService.sortOptions.changingTable});
        break;
      case 'wheelchair':
        this.geofireService.sortOptions.wheelchair = !this.geofireService.sortOptions.wheelchair;
        this.labelToggled.next({id: 3, value: this.geofireService.sortOptions.wheelchair});
        break;
      case 'gender':
        this.geofireService.sortOptions.genderNeutral = !this.geofireService.sortOptions.genderNeutral;
        this.labelToggled.next({id: 4, value: this.geofireService.sortOptions.genderNeutral});
        break;
      default:
    }
    this.geofireService.sortLocations();
  }

}
