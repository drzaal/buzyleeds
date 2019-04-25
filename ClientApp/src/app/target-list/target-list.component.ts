import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TargetDetailComponent } from '../target-detail/target-detail.component';
import { Target } from '../model';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
})
export class TargetListComponent {
    public targets: Target[];
    public loadError: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Target[]>(baseUrl + 'api/BusinessLead/GetAll').subscribe(result => {
        this.targets = result;
        console.log(result);
    }, error => {
      this.targets = [];
      this.loadError = error.message;
      console.error(error)
    });
  }

    public createNewTarget()
    {
        this.targets.push({ 
            name: "",
            description: "",
            status: "",
            primaryContacts: [],
            financialData: []
        });
    }
}
