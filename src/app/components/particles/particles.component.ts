import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.scss'],
})
export class ParticlesComponent implements OnInit {

  @Input() particlesForm: FormGroup;

  public Detalles: FormArray;
  public numberPoints = 1; 

  // el primer detalle viene definido en el form, podriamos no definirlo alli 
  // y añadirlo aqui nada mas entrar con addDetalle
  public particles : any; 
  
 
  constructor(private fb: FormBuilder, public dataService: DataService ) {
  }

 
  ngOnInit() {   

    this.Detalles = this.particlesForm.get('Detalles') as FormArray;
    
   

    /*
    this.particlesForm.valueChanges
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe(values => {
      console.log('values changed',values);
      Object.assign(this.particles, values);
    });
    */

  }

  onSubmit() {}

  /* el tipo de medida que toma de grosores en los puntos viene determinado por el medidor seleccionado */

  addDetalle() {
    const detalle =  this.fb.group({     
      Med03: [''],     
      Med05: [''],      
      Med1:  [''],
      Med5:  ['']
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
