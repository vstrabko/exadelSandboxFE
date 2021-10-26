import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ResourceModel } from '../models/resource.model';

export abstract class ApiService<T extends ResourceModel<T>> {
  constructor(
    private httpClient: HttpClient,
    private tConstructor: { new (m: Partial<T>, ...args: unknown[]): T },
    protected apiUrl: string,
  ) {}

  public create(resource: Partial<T> & { toJson: () => T }): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl}`, resource.toJson());
  }

  public get(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.apiUrl}`);
  }

  public getById(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}/${id}`);
  }

  public update(resource: Partial<T> & { toJson: () => T }): Observable<T> {
    return this.httpClient.put<T>(`${this.apiUrl}/${resource._id}`, resource.toJson());
  }

  public delete(id: number): Observable<void | T> {
    return this.httpClient.delete<void | T>(`${this.apiUrl}/${id}`);
  }
}
