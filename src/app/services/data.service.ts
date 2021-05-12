import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public apiServerUrl = environment.apiServerUrl;
  public readonly BASE_URL = this.apiServerUrl + 'maintenance' + '/'; 

  public clientsList: any[];
  private  _selectedClient: any;  // lo hago con getter and setter para el storage
  
  public equipmentsList: any[];
  public selectedEquipment: any;

  public modelsList: any[];
    
  public techniciansList: any[];      
  public usersList: any[];
  public contactList: any[];

  public groupsList: any[];
  public subGroupsList: any[];

  public measurersList: any[];

  public particlesMeasurersList: any[];
  public particlesMeasurerSelected: any;

  public velocitiesMeasurersList: any[];
  public preasuresMeasurersList: any[];

  public maintenanceList: any[];

  public isosList: any[];

  private _storage: Storage | null = null;

  private hasDataLoaded = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
   
    const storage = await this.storage.create();
    this._storage = storage;
    /* como no puedo ponerlo en el setter */
    console.log('init dataservice',this._selectedClient);

    if(!this._selectedClient){
      console.log('getting from storage');
      this._selectedClient = await this._storage.get('client')
   }   

  }

  async getData(){
    //TODO ESTE LIO MEJOR EN SERVIDOR

        const [clientResponse,
          equipmentResponse,
          technicianResponse,
          userResponse,
          modelResponse,
          groupResponse,
          subgroupResponse,
          measurersResponse,
          maintenancesResponse,
          isosResponse
    ] = await Promise.all([
    fetch(this.BASE_URL +'customers'),
    fetch(this.BASE_URL +'equipments'),
    fetch(this.BASE_URL +'technicians'),
    fetch(this.BASE_URL +'users'),
    fetch(this.BASE_URL +'models'),
    fetch(this.BASE_URL +'groups'),
    fetch(this.BASE_URL +'subgroups'),
    fetch(this.BASE_URL + 'measurers'),
    fetch(this.BASE_URL + 'maintenances'),
    fetch(this.BASE_URL + 'isos'),
    ]);

    this.clientsList =   (await clientResponse.json()).filter(e => e.nombreComercial!=''); 
    this.equipmentsList =   await equipmentResponse.json();
    this.modelsList = await modelResponse.json();
    this.groupsList = await groupResponse.json();
    this.subGroupsList = await subgroupResponse.json();
    this.measurersList = await measurersResponse.json(); 
    this.maintenanceList = await maintenancesResponse.json();
  
    this.techniciansList = await technicianResponse.json();

    this.isosList = await isosResponse.json();
    console.log('isosList',this.isosList);

    this.clientsList.sort(function (a,b){      
    if (a.nombreComercial>b.nombreComercial)
        return 1;
    if (a.nombreComercial<b.nombreComercial)
        return -1;
    return 0;
    });

    this.contactList = this.clientsList.reduce((a,b) => {
      //console.log(a);
      return a.concat(b.contacts); // a.contacts.concat(b.contacts)
    },[]);

   

    this.maintenanceList.forEach( m => {
     m.numeroMantenimiento =  m.numeroMantenimiento || m.numeroMantenimientoNoenac || m.numeroMantenimientoPr;
     m.tecnico = this.techniciansList.find(t => t.tecnicoId == m.tecnicoId);
     m.peticionario = this.contactList.find(p => p.customerContactId == m.peticionarioId);
    });
    //console.log('this.modelsList',this.modelsList);
    /*
    console.log('this.maintenanceList',this.maintenanceList);
    console.log('this.groupsList',this.groupsList);
    console.log('this.subGroupsList',this.subGroupsList);
    console.log('this.modelsList',this.modelsList);
    console.log('this.measurersList',this.measurersList);

    */
    // hay subgrupo en ambos en equipo y en modelo cual es? luego el grupoid viene en el subgrupo 

    this.equipmentsList.forEach(e =>{
    var model = this.modelsList.find(m => m.modeloId == e.modeloId);
    e.modelName = model ? model.nombre : 'sin nombre' ;
    e.modelDescription = model ? model.descripcion : 'sin nombre' ;
    e.brandName = model ? model.marcaDescripcion : 'sin nombre' ;

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


    
    this.usersList =  await userResponse.json();


    this.particlesMeasurersList = this.measurersList.filter(m => m.tipoMedidorId === 1); //tabla  tipo medidores 
    this.velocitiesMeasurersList = this.measurersList.filter(m => m.tipoMedidorId === 3); 
    this.preasuresMeasurersList = this.measurersList.filter(m => m.tipoMedidorId === 2);

    this.hasDataLoaded = true;

    }

   /* getter and setter */

   public get selectedClient() {     

     return this._selectedClient;
   }
    
   public set selectedClient(client) {
    this._selectedClient = client;
    this._storage?.set('client', client);
   }

   /* esto hay que pensar otra manera de hacerlo para los resolvers */
   /* ojo que llama storage directamente , que no a _storage, o sea que no se ha hecho el create
     es porque el resolve lo llama ante de que el init del servicio haya acabado 
     entiendo que funciona porque el el store ya exite
     OJO que el store da la impresion que es para todas la aplicaciones , y crearlo es solo 
     crear la variable _ionickv en el IndexedDB
   */  
   public async getClientFromStore(){

    if(this.hasDataLoaded== false){ //truco para que carga todo en un refresh, hay que hacerlo mejor
      await this.getData();
    } 

    return await this.storage.get('client');
   }

  /* para guardar mantenimiento/ensayo igual deberia ponerlo en otro servicio */
   
  public async saveMantenience(maintenance){
    
    return fetch(this.BASE_URL, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(maintenance), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error));
    
  }

}
