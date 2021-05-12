import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-laminarity',
  templateUrl: './laminarity.component.html',
  styleUrls: ['./laminarity.component.scss'],
})
export class LaminarityComponent implements OnInit {

  @Input() velocitiesForm: FormGroup;

  public Detalles: FormArray;
  public numberPoints = 0; 
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.Detalles = this.velocitiesForm.get('Detalles') as FormArray;   
    this.addDetalle(); //añadimos el primero
  }

  addDetalle() {
    const detalle =  this.fb.group({
      PuntoMedicion: [''],
      Medicion: [''],
      MedicionCorreccion: ['']      
    });

    this.Detalles.push(detalle);
    this.numberPoints++;

  }
  removeDetalle() {    
    if (this.numberPoints>0){
      this.Detalles.removeAt(this.Detalles.length-1);
      this.numberPoints--;
    }
    
  }

  castAsFormGroup( abstractControl : AbstractControl){
    return abstractControl as FormGroup; 
  }

}
