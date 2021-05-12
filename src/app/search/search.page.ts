import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public apiServerUrl = environment.apiServerUrl;
  public readonly BASE_URL = this.apiServerUrl + 'maintenance' + '/'; 

  constructor(private router: Router, private dataService: DataService) { }
  
  public clientsListSearched: any[];
  public selectedClient: any;

  public searchTerm;

  async ngOnInit() {
    await this.dataService.getData();
    this.clientsListSearched = this.dataService.clientsList;

    
  }

  async filterList(evt) {  
    

    this.searchTerm = evt.srcElement.value;
  
    if (!this.searchTerm) {
      this.clientsListSearched = this.dataService.clientsList;
      return;
    }
   
    // por nombre comercial, codigo cliente, codigo postal
    this.clientsListSearched = this.dataService.clientsList.filter(client => {
      if (client.nombreComercial && this.searchTerm) {
        return (
          client.nombreComercial.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
          || client.codigoCustomer.indexOf(this.searchTerm)>1
          || client.codigoPostal.indexOf(this.searchTerm)>1
          );
      }
    });

    console.log('this.clientsListSearched',this.clientsListSearched);
  }

  gotoClient(client){
   
    this.dataService.selectedClient = client;
    this.router.navigate(['/client']);
  }

}
