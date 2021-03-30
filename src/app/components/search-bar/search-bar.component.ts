import { Component, OnInit } from '@angular/core';
import { GeofireService } from '../../services/geofire.service';
import { GoogleMapService } from 'src/app/services/google-map.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {

  searchText = '';
  searchSuggestions: any[];

  searchBarShow = false;

  constructor(private geoservice: GeofireService, private googleMapService: GoogleMapService) {
  }

  enterPressed() {
    console.log(this.searchText);
    this.googleMapService.searchbarSuggestion(this.searchText).then( () => {
      this.searchBarShow = true;
      this.searchSuggestions = this.googleMapService.getSearchSuggestions;
    });
  }

  suggestionPressed(suggestion) {
    console.log(suggestion);
    this.googleMapService.searchBarSelect(suggestion);
    this.searchBarShow = false;
    this.searchText = suggestion.description;
  }

  ngOnInit() {}

}
