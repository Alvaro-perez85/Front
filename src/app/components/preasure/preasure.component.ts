import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preasure',
  templateUrl: './preasure.component.html',
  styleUrls: ['./preasure.component.scss'],
})
export class PreasureComponent implements OnInit {

  @Input() preasureForm: FormGroup;

  constructor() { }

  ngOnInit() {}

}
