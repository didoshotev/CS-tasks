import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getData() { 
    return JSON.parse(localStorage.getItem('userData'));
  }

  public setData(data) { 
    localStorage.setItem('userData', JSON.stringify(data));
  }
}
