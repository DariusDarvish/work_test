import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatesService {
  private first_date= new BehaviorSubject<any>('');
  currentfirst_date = this.first_date.asObservable();
  private last_date= new BehaviorSubject<any>('');
  currentlast_date = this.last_date.asObservable();

  constructor() { }
  changefirst_date(first_date
    :any){
      this.first_date.next(first_date)
    }


  changelast_date(last_date
    :any){
      this.last_date.next(last_date)
    }
}
