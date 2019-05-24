import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Target } from '../model';

@Component({
  selector: 'app-target-detail',
  inputs: ['target'],
  templateUrl: './target-detail.component.html',
})
export class TargetDetailComponent {
    public target: Target;
    public loadError: string;

    public editMode: boolean;

    private httpClient: HttpClient;
    private apiUrl: string;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.apiUrl = baseUrl + 'api/BusinessLead/LeadDetail/';
        this.httpClient = http;
        this.editMode = false;
        if (this.target) return;
    }

    public toggleEdit()
    {
        this.editMode = !this.editMode;
    }

    public insertTarget()
    {
        this.httpClient.put<Target>(this.apiUrl, this.target)
          .subscribe(
            result => this.target = result, 
            error => console.log(error)
          );
    }

    public updateTarget()
    {
        this.httpClient.post<Target>(this.apiUrl, this.target)
          .subscribe(
            result => this.target = result, 
            error => console.log(error)
          );
    }

    public find(id : number)
    {
        this.httpClient.get<Target>(this.apiUrl + id).subscribe(result => {
          this.target = result;
        }, error => {
          this.loadError = error.message;
          console.error(error)
        });
    }

}
