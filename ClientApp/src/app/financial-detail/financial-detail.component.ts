import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Financial } from '../model';
import { updateClassProp } from '../../../node_modules/@angular/core/src/render3/styling';

@Component({
  selector: 'app-financial-detail',
  inputs: ['financial', 'focusCallback', 'editCallback', 'deleteCallback'],
  templateUrl: './financial-detail.component.html',
})
export class FinancialDetailComponent {
    public refId: number;
    public refListContainer: Array<Financial>;

    public financial: Financial;
    public loadError: string;

    public editMode: boolean;

    public focusCallback: Function;
    public editCallback: Function;
    public deleteCallback: Function;

    private httpClient: HttpClient;
    private apiUrl: string;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.apiUrl = baseUrl + 'api/Financial/';
        this.httpClient = http;
        this.editMode = false;
        if (this.financial && this.financial.id == null) this.editMode = true;
    }

    public toggleEdit()
    {
        this.editMode = !this.editMode;
        if (this.editMode && this.editCallback) this.editCallback();
    }

    public saveTarget()
    {
        console.log(this.financial);
        this.httpClient.post<Financial>(
            this.apiUrl + 'SaveRecord/', 
            this.financial, 
            { headers: { 'Content-type': 'application/json'} })
          .subscribe(
              result => {
                  this.financial = result;
                  if (this.editCallback) this.editCallback();
              }, 
              error => console.log(error),
              () => this.toggleEdit()
          );
    }

    public deleteTarget()
    {
        this.httpClient.delete<void>(this.apiUrl + 'DeleteRecord/' + this.financial.id)
          .subscribe(
              () => {
                  if (this.deleteCallback) this.deleteCallback();
              }, 
              error => console.log(error),
              () => this.financial = null
          );
    }

    public find(id : number)
    {
        this.httpClient.get<Financial>(this.apiUrl + 'GetById/' + id).subscribe(result => {
          this.financial = result;
        }, error => {
          this.loadError = error.message;
          console.error(error)
        });
    }

}
