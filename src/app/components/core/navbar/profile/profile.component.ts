import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../../services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private sessionService: SessionService,) {
  }

  displayStatus: string;

  ngOnInit() {
    this.displayStatus = 'none';
  }

  logoutAction(): void {
    this.sessionService.removeSession();
  }

  getDisplay(): string {
    return this.displayStatus;
  }

  changeStateProfile(): void {
    this.displayStatus = (this.displayStatus === 'none') ? 'flex': 'none';
  }

}
