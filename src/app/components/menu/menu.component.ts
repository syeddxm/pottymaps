import { Component, OnInit } from '@angular/core';
import { FireauthService } from 'src/app/services/fireauth/fireauth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user: User;

  loggedIn: boolean;

  constructor(private fireauth: FireauthService, private router: Router, public menuCtrl: MenuController) {

    this.fireauth.loggedIn().subscribe( u => {
      console.log(u);
      if (u) {
        console.log('user logged in');
        console.log(this.user);
        this.user = this.fireauth.getUserInformation;
        console.log(this.user);
      } else {
        console.log('user logged out');
        this.user = undefined;
      }

    });
  }

  goToFavourites() {
    this.router.navigate(['/favourites']).then(() => {
      this.closeMenu();
    });
  }


  signOut() {
    this.fireauth.logOut();
    this.closeMenu();
  }

  login() {
    this.router.navigateByUrl('login').then(() => {
      this.closeMenu();
    });
  }

  closeMenu() {
    this.menuCtrl.close('start');
  }

  ngOnInit() {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
  }

}
