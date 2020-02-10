import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../../services/session.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../../../services/user.service';
import {log} from 'util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private sessionService: SessionService,
              private userService: UserService) {
    const id = sessionService.getSession();
    this.userProfile$ = userService.getUserByID(Number(id)).subscribe(async query => {
      await this.setUser(query);
    });
  }

  userProfile$: Subscription;
  userProfile: any;

  displayStatus: string;

  ngOnInit() {
    this.displayStatus = 'none';
  }

  setUser(query) {
    this.userProfile = query.data.UserByID;
  }

  checkResource(): boolean {
    return (this.userProfile.image.includes('https://lh3.googleusercontent.com/')) ? false : true;
  }

  logoutAction(): void {
    this.sessionService.removeSession();
  }

  getDisplay(): string {
    return this.displayStatus;
  }

  changeStateProfile(): void {
    this.displayStatus = (this.displayStatus === 'none') ? 'flex' : 'none';
  }

}
