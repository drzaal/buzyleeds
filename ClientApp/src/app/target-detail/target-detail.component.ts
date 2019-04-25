import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Target } from '../model';
import { updateClassProp } from '../../../node_modules/@angular/core/src/render3/styling';
import { toDate } from '../../../node_modules/@angular/common/src/i18n/format_date';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';

@Component({
  selector: 'app-target-detail',
  inputs: ['target', 'focusCallback', 'editCallback', 'deleteCallback'],
  templateUrl: './target-detail.component.html',
})
    export class TargetDetailComponent implements OnInit {

    public refId: number;
    public refListContainer: Array<Target>;
    public target: Target;
    public loadError: string;

    public editMode: boolean;
    public hideContacts: boolean;
    public hideFinancials: boolean;

    public focusCallback: Function;
    public editCallback: Function;
    public deleteCallback: Function;

    public openContactId: number;
    public openFinancialId: number;

    private httpClient: HttpClient;
    private apiUrl: string;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.apiUrl = baseUrl + 'api/BusinessLead/';
        this.httpClient = http;
        this.editMode = false;
    }

    public ngOnInit() {
        console.log(this.target);
        if (this.target && this.target.id == null) this.editMode = true;
    }

    public toggleEdit()
    {
        this.editMode = !this.editMode;
        if (this.editMode && this.editCallback) {
          this.editCallback();
        }
        // If we navitate away from a new record without saving, okay to throw away
        if (!this.editMode && !this.target.id && this.deleteCallback) {
            this.deleteCallback()
        }
    }

    public saveTarget()
    {
        this.httpClient.post<Target>(
            this.apiUrl + 'SaveRecord/', 
            this.target, 
            { headers: { 'Content-type': 'application/json'} })
          .subscribe(
              result => {
                  this.target = result;
                  if (this.editCallback) this.editCallback();
              },
              error => console.log(error),
              () => this.toggleEdit()
          );
    }

    public deleteTarget()
    {
        this.httpClient.delete<void>(this.apiUrl + 'DeleteRecord/' + this.target.id)
          .subscribe(
              () => {
                  if (this.deleteCallback) this.deleteCallback();
              }, 
              error => console.log(error),
              () => this.target = null
          );
    }

    public createNewContact()
    {
        if (!this.target.primaryContacts) this.target.primaryContacts = [];
        this.target.primaryContacts.push({ 
            businessLeadId: this.target.id,
            personalName: "",
            middleName: "",
            familyName: "",
            alias: "",
            phone: "",
            email: ""
        });
    }

    public createNewFinancial()
    {
        if (!this.target.financialData) this.target.financialData = [];
        this.target.financialData.push({ 
            businessLeadId: this.target.id,
            eventDate: new Date(),
            currencyValue: 0
        });
    }

    public removeContact(id: number)
    {
        this.openEditContact(null);
        this.target.primaryContacts.splice(id, 1);
    }

    public removeFinancial(id: number)
    {
        this.openEditFinancial(null);
        this.target.primaryContacts.splice(id, 1);
    }

    public openEditContact(id: number)
    {
        this.openContactId = id;
    }

    public openEditFinancial(id: number)
    {
        this.openFinancialId = id;
    }

    public find(id : number)
    {
        this.httpClient.get<Target>(this.apiUrl + 'GetById/' + id).subscribe(result => {
          this.target = result;
        }, error => {
          this.loadError = error.message;
          console.error(error)
        });
    }

}
