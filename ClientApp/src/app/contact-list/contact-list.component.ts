import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { TargetDetailComponent } from '../target-detail/target-detail.component';
import { Contact } from '../model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent {
    public contacts: Contact[];
    public loadError: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Contact[]>(baseUrl + 'api/Contact/GetAll').subscribe(result => {
        this.contacts = result;
        console.log(result);
    }, error => {
      this.contacts = [];
      this.loadError = error.message;
      console.error(error)
    });
  }
}
