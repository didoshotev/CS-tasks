import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getData() { 
    return JSON.parse(localStorage.getItem('user'));
  }

  public setData(data) { 
    localStorage.setItem('user', JSON.stringify(data));
  }

  public clearData(key) { 
    localStorage.removeItem(key);
  }
}
