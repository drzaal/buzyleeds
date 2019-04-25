import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
  export class HomeComponent {
    public activeLeadCount: number;
    public activeContactCount: number;



    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

        let countClient = http;

        countClient.get<number>(baseUrl + 'api/BusinessLead/TotalCount/')
            .subscribe(
                leadCount => this.activeLeadCount = leadCount,
                error => console.log(error)
              );

        countClient.get<number>(baseUrl + 'api/Contact/TotalCount/')
            .subscribe(
                contactCount => this.activeContactCount = contactCount,
                error => console.log(error)
              );

    }
}
