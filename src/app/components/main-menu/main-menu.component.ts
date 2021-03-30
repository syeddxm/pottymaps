import { Component, OnInit, Input } from '@angular/core';
import { SubmitService } from '../..//services/submit.service';
import { MenuService } from '../../services/menu.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { GeofireService } from 'src/app/services/geofire.service';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  @Input() selectedIndex: any;

  loggedIn: boolean;
  user = null;

  constructor(
    private submitService: SubmitService,
    private menuService: MenuService,
    private authService: FireauthService,
    private geoService: GeofireService
  ) {

    this.authService.loggedIn().subscribe((state) => {
      this.loggedIn = state;

      if (this.loggedIn) {
        this.user = this.authService.getUserInformation;
      } else {
        this.user = null;
      }
    });

    this.submitService.submitMode.subscribe((v) => {
      if (v) {
        this.selectedIndex = 3;
      } else {
        this.selectedIndex = 0;
      }
    });

    this.menuService.labelToggled.subscribe(({id, value}) => {
      this.labels[id].icon = value;
    });

  }

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    },
  ];
  public labels = [
    {
      name: 'Favourites',
      click: 'fav',
      icon: this.geoService.sortOptions.favourite,
    },
    {
      name: 'Open Now',
      click: 'open',
      icon: this.geoService.sortOptions.open,
    },
    {
      name: 'Changing Table',
      click: 'changing',
      icon: this.geoService.sortOptions.open,
    },
    {
      name: 'Wheelchair Access',
      click: 'wheelchair',
      icon: this.geoService.sortOptions.open,
    },
    {
      name: 'Gender Neutral',
      click: 'gender',
      icon: this.geoService.sortOptions.open,
    }
  ];



  ngOnInit() {
    const path = window.location.pathname.split(' ')[0];
    console.log(path);
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.url.toLowerCase() === path.toLowerCase());
    }
  }

  labelClick(click: string) {
    this.menuService.clicked(click);
  }

  submit() {
    this.submitService.enableSubmitMode();
  }

  signOut() {
    this.authService.logOut();
  }

}
