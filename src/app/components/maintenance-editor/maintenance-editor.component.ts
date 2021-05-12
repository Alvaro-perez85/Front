import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-maintenance-editor',
  templateUrl: './maintenance-editor.component.html',
  styleUrls: ['./maintenance-editor.component.scss'],
})
export class MaintenanceEditorComponent implements OnInit {

  @Input() public selectedEquipment: any;

  public techniciansList: any[];      
  public usersList: any[];
  public petitionaryList: any[]; // los peticionarios son contactos , que estan asociados al cliente

  public particlesMeasurersList: any[];
  public velocitiesMeasurersList: any[];
  public preasuresMeasurersList: any[];
  public tightnessMeasurersList: any[];
  public temperatureMeasurersList: any[];
  public humidityMeasurersList: any[];

  public isosList: any[];

  public lastMaintenance: any;

  public activeId:any;

  
  /* voy a utilizar los nombre del modelo en español para que luego los deserialize directamente */
  /* son nested form para que no de el error de abstrato lo hago como dice aqui 
    https://stackoverflow.com/questions/59284894/type-abstractcontrol-is-missing-the-following-properties-from-type-formgroup
  */

  public preasuresForm = this.fb.group({
    // por poner alguno pero no se los que valen
   FuncionamientoPrevio : [],
   ManometroACeeo: [],
   PositivoNegativo: [],     
   Detalles: this.fb.array([])
  });  

  public particlesForm = this.fb.group({
    //Largo :['', Validators.required],
    Largo:[''],
    Profundo : [''],    
    Area : [''],    
    Puntos : [1],
    Comentario: [''],
    Detalles: this.fb.array([
      this.fb.group({
        Med03: [''],        
        Med05: [''],       
        Med1:  [''],
        Med5:  ['']
      })
    ]) 
  });
  
  public velocitiesForm =  this.fb.group({
    // por poner alguno pero no se los que valen
   EntradaArea : [],
   VelAireSalida: [],
   VelAireSalidaCorr: [],
   Salida :['' ],
   Entrada : [''],
   Puntos : [1],
   Comentario: [''],
   MediaLaminaridad: [],
   FactorCobertura:[],
   Detalles: this.fb.array([]) //lo relleno luego, no como el de arriba 
  });




  maintenanceForm = this.fb.group({
    measures:[],
    maintenanceEnac:[],
    maintenanceType: [], 

      
    FechaEnsayo : [new Date().toISOString()],
    FechaProximoEnsayo : [],
    TecnicoId : ['', Validators.required], 
    PeticionarioId: ['', Validators.required], 

    MedidorParticulasId: [0],    
    MedidorVelocidadId: [0],   
    MedidorPresionId: [0],
    MedidorEstanqueId: [0],

    Laboratorio:[''],
    AnnoConstruccion:[],
    Sala:[''],
    NumIdentificacion:[''],

    IsoId: [0],
  
    Particulas : this.particlesForm,

    Velocidades : this.velocitiesForm,

    Presiones : this.preasuresForm  

  });  

  
  constructor(private fb: FormBuilder, private dataService: DataService ) {    
    
    this.techniciansList = dataService.techniciansList;
    this.usersList =  dataService.usersList;
    this.petitionaryList = this.dataService.selectedClient.contacts;

    this.isosList = this.dataService.isosList;
    //console.log('petitionaryList',this.petitionaryList);   
    // medidores
    this.particlesMeasurersList = dataService.measurersList.filter(m => m.tipoMedidorId === 1); //tabla  tipo medidores 
    this.velocitiesMeasurersList = dataService.measurersList.filter(m => m.tipoMedidorId === 3); 
    this.preasuresMeasurersList = dataService.measurersList.filter(m => m.tipoMedidorId === 2); 
    this.tightnessMeasurersList = dataService.measurersList.filter(m => m.tipoMedidorId === 4); 
    this.temperatureMeasurersList = dataService.measurersList.filter(m => m.tipoMedidorId === 5);
    this.humidityMeasurersList = dataService.measurersList.filter(m => m.tipoMedidorId === 6);
  }


  ngOnInit() {
    console.log('selectedEquipment',this.selectedEquipment);
    if (this.selectedEquipment.maintenances.length>0){
      this.lastMaintenance = this.selectedEquipment.maintenances[this.selectedEquipment.maintenances.length-1];      
    }

   /* evento que marca el medidor de particulas seleccionado en el data service para que lo pueda pillar
      el componente */

    this.maintenanceForm.valueChanges
    .pipe(distinctUntilChanged())
    .subscribe(values => {
      console.log('values changed',values);
      //Object.assign(this.particles, values);
      // if(this.dataService.particlesMeasurerSelected && values.MedidorParticulasId!=this.dataService.particlesMeasurerSelected.medidorId) 
        this.dataService.particlesMeasurerSelected =   this.particlesMeasurersList.find(m=> m.medidorId == values.MedidorParticulasId);
      
    });

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



  async onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.maintenanceForm.value);
    
    this.lastMaintenance = await this.dataService.saveMantenience(this.maintenanceForm.value);
    this.lastMaintenance.numeroMantenimiento =  this.lastMaintenance.numeroMantenimiento || this.lastMaintenance.numeroMantenimientoNoenac || this.lastMaintenance.numeroMantenimientoPr;
    this.lastMaintenance.tecnico = this.techniciansList.find(t => t.tecnicoId == this.lastMaintenance.tecnicoId);
    this.lastMaintenance.peticionario = this.petitionaryList.find(p => p.customerContactId == this.lastMaintenance.peticionarioId);

    this.dataService.maintenanceList.push(this.lastMaintenance); // este hace falta ?
    this.selectedEquipment.maintenances.push(this.lastMaintenance);

    this.maintenanceForm.reset();  
    

  }

  get aliases() {
    return this.maintenanceForm.get('aliases') as FormArray;
  }

  updateMaintenance() {  

    console.log('lastMaintenance',this.lastMaintenance);

    this.maintenanceForm.patchValue({
      maintenanceEnac: this.lastMaintenance.mantenimientoEnac === 1,
      maintenanceType: this.lastMaintenance.mantenimientoNtPr == 1 ?'PR':'NT',
      MedidorParticulasId: this.lastMaintenance.medidorParticulasId, // this.particlesMeasurersList[0].medidorId,
      MedidorVelocidadId: this.lastMaintenance.medidorVelocidadId, //this.velocitiesMeasurersList[0].medidorId,
      MedidorPresionId: this.lastMaintenance.medidorPresionId, // this.preasuresMeasurersList[0].medidorId,
      MedidorEstanqueId: this.lastMaintenance.medidorEstaqueId, //this.tightnessMeasurersList[0].medidorId,
     
      Laboratorio: this.lastMaintenance.laboratorio,
      AnnoConstruccion: this.lastMaintenance.annoConstruccion,
      Sala: this.lastMaintenance.sala,
      NumIdentificacion: this.lastMaintenance.numIdentificacion,

      PeticionarioId: this.lastMaintenance.peticionarioId,
      TecnicoId: this.lastMaintenance.tecnicoId,

      /*
      address: {
        street: '123 Drew Street'
      }
      */
    });
   
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  public updateProfile(){};

  isoValues(isoId){
    const aux =  this.isosList.find( i => i.isoId == isoId);
    if (aux!=null){
      return "0.3-" + aux.particulas03 + " 0.5- " + aux.particulas05 +  " 1- " + aux.particulas1  + " 5- " + aux.particulas5
    }

    return "sin seleccionar";

  }

}
