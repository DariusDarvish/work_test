import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private Title= new BehaviorSubject<any>('Dashboard');
  currentTitle = this.Title.asObservable();

  constructor() { }

  changeTitle(Title
    :any){
      this.Title.next(Title)
    }
}
