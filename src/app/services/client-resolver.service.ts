import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<any> {
  constructor(private dataService: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.dataService.getClientFromStore();
  }
}