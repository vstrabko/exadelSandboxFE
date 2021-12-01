import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CandidateGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): Observable<boolean> | boolean {
    if (localStorage.getItem('accessToken') !== null) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
