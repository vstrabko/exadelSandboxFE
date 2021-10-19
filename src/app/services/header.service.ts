import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderRole {

  public setCacheData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getCacheData(key: string): any {
    return JSON.parse(localStorage.getItem(key) || '');
  }

  public removeCachedDate(key: string): void {
    localStorage.removeItem(key);
  }

}