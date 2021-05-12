import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Maintenance } from './../models/DataLayer'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public todo : FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    console.log(this.todo.value);


    //var url = 'https://localhost:44344/api/maintenance';
    //var data = {username: 'example'};


    var url = 'https://localhost:44344/api/auth';
    var data = {username: 'admin', password: 'A78840931'};
    
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));


  }
   

}
