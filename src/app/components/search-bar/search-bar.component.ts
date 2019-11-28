import { Component, OnInit } from '@angular/core';
import { GeoService } from '../../services/geo.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {

  searchText = '';
  searchSuggestions: any[];

  searchBarShow = false;

  constructor(private geoservice: GeoService) {
  }

  enterPressed() {
    this.geoservice.searchbarSuggestion(this.searchText).then( () => {
      this.searchBarShow = true;
      this.searchSuggestions = this.geoservice.getSearchSuggestions;
    });
  }

  suggestionPressed(suggestion) {
    console.log(suggestion);
    this.geoservice.searchBarSelect(suggestion);
    this.searchBarShow = false;
    this.searchText = suggestion.description;
  }

  ngOnInit() {}

}
