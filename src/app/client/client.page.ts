import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormControl } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  public client;
  public equipmentsTabs: any[] = [];
  closeResult = '';
  activeNavId ;

  @ViewChild('content') content: ElementRef;
  

  constructor(private dataService: DataService, private modalService: NgbModal) { }


  ngOnInit() {
    this.client = this.dataService.selectedClient;
    console.log('client',this.client);
   
  }
  
  ngAfterViewInit() {
    if (this.client.equipments.length ==1){ //si solo tienen uno lo abro
      this.addEquipmentToTabs(this.client.equipments[0]); 
    }else{
      this.open(this.content);
    }
  }



  addEquipmentToTabs(equipment){
    if (!this.equipmentsTabs.includes(equipment)){
      this.equipmentsTabs.push(equipment);
    }
    this.activeNavId = equipment.numSerie; //activa la tab que tiene ese id, que son los numeros de serie de ls equipos

  }

  // https://ng-bootstrap.github.io/#/components/modal/examples
  open(content) {
    this.modalService.open(content, { size : 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }




  /*
  intento de poner buscador a la tabla
  https://ng-bootstrap.github.io/#/components/table/examples

  searchEquipments(text: string, pipe: PipeTransform): any[] {
    return COUNTRIES.filter(country => {
      const term = text.toLowerCase();
      return country.name.toLowerCase().includes(term)
          || pipe.transform(country.area).includes(term)
          || pipe.transform(country.population).includes(term);
    });
  }
  */

  
  

}
