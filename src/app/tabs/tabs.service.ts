import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  public hasParticles: boolean = false;
  public hasVelocities: boolean = false;

  private fooSubject = new Subject<any>();

  publishSomeData(data: any) {
    this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
      return this.fooSubject;
  }
  
  constructor() { }
}
