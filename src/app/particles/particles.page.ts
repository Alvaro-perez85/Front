import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-particles',
  templateUrl: './particles.page.html',
  styleUrls: ['./particles.page.scss'],
})
export class ParticlesPage implements OnInit {

  public numberPoints = 10;
  
  particlesForm = this.fb.group({
    lengthness:['', Validators.required],
    deepness: ['', Validators.required],    
    area: ['', Validators.required],
    points : [1],
   
    
  });

  constructor(private fb: FormBuilder ) { }

  ngOnInit() {
  }
  
  onSubmit() {
    
  }

}
