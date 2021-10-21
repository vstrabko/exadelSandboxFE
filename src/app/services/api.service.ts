import { map } from 'rxjs/operators';
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
    return this.httpClient
      .post<T>(`${this.apiUrl}`, resource.toJson())
      .pipe(map((result: T) => new this.tConstructor(result)));
  }

  public get(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.apiUrl}`);
    //.pipe(map((result: T[]) => result.map((i: T) => new this.tConstructor(i))));
  }

  public getById(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}/${id}`);
    // .pipe(map((result: T) => new this.tConstructor(result)));
  }

  public update(resource: Partial<T> & { toJson: () => T }): Observable<T> {
    return (
      this.httpClient
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .put<T>(`${this.apiUrl}/${resource._id}`, resource.toJson())
        .pipe(map((result: T) => new this.tConstructor(result)))
    );
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
