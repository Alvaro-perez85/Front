import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tightness',
  templateUrl: './tightness.component.html',
  styleUrls: ['./tightness.component.scss'],
})
export class TightnessComponent implements OnInit {

  public isTightnessCorrect = true; 

  constructor() { }

  ngOnInit() {}

}
