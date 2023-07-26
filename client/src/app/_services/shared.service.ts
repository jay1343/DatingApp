import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // Create an EventEmitter to emit events when triggered by the parent component
  public dataChangedEvent: EventEmitter<any> = new EventEmitter<any>();
  public chartChangedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
