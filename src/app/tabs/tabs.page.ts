import { Component, OnInit } from '@angular/core';
import { TabsService } from './tabs.service';



@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  public hasParticles = false;
  public hasVelocities = false;
  public hasPreasures = false;
  public hasBarriers = false;
  public hasRecirculations = false;
  public hasFlows = false;
  public hasGases = false;


  constructor(public tabsService: TabsService) {
    console.log('tabs');
    
  }

  ngOnInit() {
    this.tabsService.getObservable().subscribe((data) => {
      console.log('Data received', data);
      setTimeout(() => {
        this.hasParticles = data.hasParticles;
        this.hasVelocities =  data.hasVelocities;
        this.hasPreasures = data.hasPreasures;
        this.hasBarriers = data.velocidadBarre == 1; // o es esta o velocidadBarreaus
        this.hasRecirculations = data.recirculaciones == 1;
        this.hasFlows = data.caudal == 1;
        this.hasGases =  data.sale == 1; // ni idea de cual es la variable
      }); 
      
      //el set timeout hay que ponerlo para que no salte el error Expression has changed after it was checked
      // https://blog.angular-university.io/angular-debugging/
     });

  }

}
