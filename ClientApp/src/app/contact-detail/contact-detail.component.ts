import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Target, Contact } from '../model';
import { updateClassProp } from '../../../node_modules/@angular/core/src/render3/styling';

@Component({
  selector: 'app-contact-detail',
  inputs: ['contact', 'refId', 'refListContainer', 'focusCallback', 'editCallback', 'deleteCallback'],
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent implements OnInit {
    public refId: number;
    public refListContainer: Array<Contact>;
    public contact: Contact;
    public loadError: string;

    public editMode: boolean;

    public focusCallback: Function;
    public editCallback: Function;
    public deleteCallback: Function;

    private httpClient: HttpClient;
    private apiUrl: string;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.apiUrl = baseUrl + 'api/Contact/';
        this.httpClient = http;
    }

    public ngOnInit() {
        console.log(this.contact);
        console.log(this.refId);
        console.log(this.deleteCallback);
        // start a new record in edit mode
        this.editMode = this.contact.id != null ? false : true;
    }

    public toggleEdit()
    {
        this.editMode = !this.editMode;
        if (this.editMode && this.editCallback) this.editCallback(this.refId);
    }

    public saveRecord()
    {
        console.log(this.contact);
        this.httpClient.post<Contact>(
            this.apiUrl + 'SaveRecord/', 
            this.contact, 
            { headers: { 'Content-type': 'application/json'} })
          .subscribe(
              result => {
                  this.contact = result;
                  if (this.editCallback) this.editCallback(this.refId);
              }, 
              error => console.log(error),
              () => { this.editMode = false; }
          );
    }

    public deleteRecord()
    {
        this.httpClient.delete<void>(this.apiUrl + 'DeleteRecord/' + this.contact.id)
          .subscribe(
              () => {
                  if (this.refListContainer) this.refListContainer.splice(this.refId, 1);
              }, 
              error => console.log(error),
              () => this.contact = null
          );
    }

    public find(id : number)
    {
        this.httpClient.get<Contact>(this.apiUrl + 'GetById/' + id).subscribe(result => {
          this.contact = result;
        }, error => {
          this.loadError = error.message;
          console.error(error)
        });
    }

}
