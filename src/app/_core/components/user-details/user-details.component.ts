import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '@core/feed/feed.models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit {

  private _user: User;

  constructor(private _bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  public hide(): void {
    this._bsModalRef.hide();
  }

  public getHeader(): string {
    const { name, username } = this._user;

    return `${name} (${username})`;
  }

  public getSubheader(): string {
    const { email, phone } = this._user;

    return `${email} - ${phone}`;
  }

  public getAddressDisplay(): string {
    const { street, suite, city, zipcode, geo: { lat, lng } } = this._user.address;

    return `${street}, ${suite} \n ${city}, ${zipcode} \n ${lat} - ${lng}`;
  }

  public getCompanyDisplay(): string {
    const { name, catchPhrase, bs } = this._user.company;

    return `${name}, ${catchPhrase} - ${bs}`;
  }

  public getWebsite(): string {
    return this._user.website;
  }

}
