import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { TabsService } from '../tabs/tabs.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-data',
  templateUrl: './main-data.page.html',
  styleUrls: ['./main-data.page.scss'],
})
export class MainDataPage implements OnInit {

 
  public apiServerUrl = environment.apiServerUrl;
  public readonly BASE_URL = this.apiServerUrl + 'maintenance' + '/'; 

  @Output() hasParticlesItemEvent = new EventEmitter<boolean>(); 
  
  
  constructor(private fb: FormBuilder, private tabsService: TabsService) { }

  mainDataForm = this.fb.group({
    measures:[],
    maintenanceEnac:[false],
    maintenanceType: ['NT'],    
    petitioner: [''],
    user:[''],
    tryDate : [new Date().toISOString()],
    technician : ['', Validators.required],
    //particles : [false],
    particlesMeasurer: [''],
    //velocity : [false],
    velocityMeasurer: [''],
    //preasure : [false],
    //tightness : [false]
    preasureMeasurer: [''],
    
  });

  
  public clientsList: any[];
  public selectedClient: any;
  
  public equipmentsList: any[];
  public selectedEquipment: any;

  public modelsList: any[];
    
  public techniciansList: any[];
      
  public usersList: any[];

  public groupsList: any[];
  public subGroupsList: any[];

  public measurersList: any[];

  public particlesMeasurersList: any[];
  public velocitiesMeasurersList: any[];
  public preasuresMeasurersList: any[];

  public maintenanceList: any[];
  public selectedMaintenance: any = { numeroMantenimiento: 'NUEVO' };


  async ngOnInit() {
   
    // await this.getEquipements();
    // await this.getCustomers(); 


    //TODO ESTE LIO MEJOR EN SERVIDOR

    const [clientResponse,
           equipmentResponse,
           technicianResponse,
           userResponse,
           modelResponse,
           groupResponse,
           subgroupResponse,
           measurersResponse,
           maintenancesResponse
      ] = await Promise.all([
      fetch(this.BASE_URL +'customers'),
      fetch(this.BASE_URL +'equipments'),
      fetch(this.BASE_URL +'technicians'),
      fetch(this.BASE_URL +'users'),
      fetch(this.BASE_URL +'models'),
      fetch(this.BASE_URL +'groups'),
      fetch(this.BASE_URL +'subgroups'),
      fetch(this.BASE_URL + 'measurers'),
      fetch(this.BASE_URL + 'maintenances')
    ]);

    this.clientsList =   (await clientResponse.json()).filter(e => e.nombreComercial!=''); 
    this.equipmentsList =   await equipmentResponse.json();
    this.modelsList = await modelResponse.json();
    this.groupsList = await groupResponse.json();
    this.subGroupsList = await subgroupResponse.json();
    this.measurersList = await measurersResponse.json(); 
    this.maintenanceList = await maintenancesResponse.json();

    this.clientsList.sort(function (a,b){      
      if (a.nombreComercial>b.nombreComercial)
          return 1;
      if (a.nombreComercial<b.nombreComercial)
          return -1;
      return 0;
    });

    this.maintenanceList.forEach( m => {
      m.numeroMantenimiento =  m.numeroMantenimiento || m.numeroMantenimientoNoenac || m.numeroMantenimientoPr;
    });
    console.log('this.maintenanceList',this.maintenanceList);
    /*
    console.log('this.groupsList',this.groupsList);
    console.log('this.subGroupsList',this.subGroupsList);
    console.log('this.modelsList',this.modelsList);
    console.log('this.measurersList',this.measurersList);
    
    */
    // hay subgrupo en ambos en equipo y en modelo cual es? luego el grupoid viene en el subgrupo 

    this.equipmentsList.forEach(e =>{
      var model = this.modelsList.find(m => m.modeloId == e.modeloId);
      e.modelName = model ? model.nombre : 'sin nombre' ;
      e.subgroup = this.subGroupsList.find(sg => sg.subgrupoId == e.subgrupoId);  //ojo utilizdo el del equipo
      if (e.subgroup){
        e.group= this.groupsList.find(g => g.grupoId == e.subgroup.grupoId);
      }
      e.maintenances = this.maintenanceList.filter(m => m.equipoId == e.equipoId) || [];
    })

    console.log('equipmentsList',this.equipmentsList);

    this.clientsList.forEach(client =>{
      client.equipments = this.equipmentsList.filter( e => e.customerId == client.customerId );
    });

    // console.log('clientsListAll',this.clientsList);
    // this.clientsList = [...this.clientsListAll]; ejemplo copia
    

    this.techniciansList = await technicianResponse.json();
    this.usersList =  await userResponse.json();


    this.particlesMeasurersList = this.measurersList.filter(m => m.tipoMedidorId === 1); //tabla  tipo medidores 
    this.velocitiesMeasurersList = this.measurersList.filter(m => m.tipoMedidorId === 3); 
    this.preasuresMeasurersList = this.measurersList.filter(m => m.tipoMedidorId === 2);
    
  } 
  

  onselectedEquipmentChange( ){
    console.log('onselectedEquipmentChange',this.selectedEquipment);

    if (this.selectedEquipment.group != undefined){
      this.tabsService.publishSomeData({
        group:this.selectedEquipment.group,
        hasParticles: this.selectedEquipment.group.particulas === 1,
        hasVelocities: this.selectedEquipment.group.velocidadLami ===1,
        hasPreasures: this.selectedEquipment.group.presion === 1,
        hasTightness: this.selectedEquipment.group.estanqueidad ===1,

      });
    }
  }

  hasVelocities(){   
    return this.selectedEquipment.group != undefined ? (this.selectedEquipment.group.velocidadLami ===1) : false;
  }

  hasTightness(){
    return this.selectedEquipment.group != undefined ? (this.selectedEquipment.group.estanqueidad ===1) : false;
  }

  hasPreasure(){
    return this.selectedEquipment.group != undefined ? (this.selectedEquipment.group.presion ===1) : false;
  }

  public onselectedClientChange( event ){
    this.selectedEquipment = null;
    this.tabsService.publishSomeData({     
      hasParticles: false,
      hasVelocities: false,
      hasPreasures: false,
      hasTightness: false,

    });
  }

  public onselectedmaintenanceChange(){

    console.log('tecnico',this.techniciansList.find( t => t.tecnicoId == this.selectedMaintenance.tecnicoId));

    this.mainDataForm.patchValue({
      tryDate : this.selectedMaintenance.fechaEnsayo,
      technician : this.selectedMaintenance.tecnicoId, // this.techniciansList.find( t => t.tecnicoId == this.selectedMaintenance.tecnicoId),
      petitioner : this.selectedMaintenance.peticionarioId,
      user: this.selectedMaintenance.userId,
      particlesMeasurer : this.selectedMaintenance.medidorParticulasId,
      velocityMeasurer :  this.selectedMaintenance.medidorVelocidadId,
      preasureMeasurer : this.selectedMaintenance.medidorPresionId
    })

  }


  onSubmit() {
   
    var data = this.mainDataForm.value;

    console.log('data',data);
    
    fetch(this.BASE_URL , {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));

  }



 /*
  public onSelectClient() {
    console.log('selectedClient', this.selectedClient);
    this.equipmentsList = this.equipmentsListAll.filter( e => e.customerId == this.selectedClient.customerId );
    if (this.equipmentsList.length == 0){
      alert('No hay clientes que tengan este equipo');
    }
    console.log('this.equipmentsList',this.equipmentsList);
    
  }
  */


  /*
  async filterList(evt) {
    console.log ('filterList',evt.srcElement.value);

    this.clientsList = await this.initializeItems();    
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.clientsList = this.clientsList.filter(currentclient => {
      if (currentclient && searchTerm) {
        return (currentclient.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentclient.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });

    console.log(this.clientsList);
  }

  async initializeItems(): Promise<any> {

    var promise = new Promise(function(resolve, reject) {
      const result = ['Cliente1','Cliente2','Cliente3']
      resolve(result);
    });

    const clientList = await promise;
    
    return clientList;
  }
 */

  /* peticiones al servidor a lo bruto hay que hacerlas bien*/
  async getEquipements() {
    var url = this.BASE_URL + 'equipments';    
    
    fetch(url).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('equipmentsList:', response)
      this.equipmentsList = response;
      this.getModels();


    });
  }

  async getCustomers() {
    var url =  this.BASE_URL + 'customers';    
    
    fetch(url).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('clientsList:', response)
      this.clientsList = response;
    });
  }

  async getModels() {
    var url = this.BASE_URL + 'models';  
        
    fetch(url).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('modelsList:', response)
      this.modelsList = response;
       
      this.equipmentsList.forEach(e =>{
        var model = this.modelsList.find(m => m.modeloId == e.modeloId ) 
        e.modelName = model ? model.nombre : 'sin nombre' ;
      })
    });
    
  }

  async getTechnicians(){
    return await (await fetch( this.BASE_URL + 'technicias')).json();

  }

 
 


}
