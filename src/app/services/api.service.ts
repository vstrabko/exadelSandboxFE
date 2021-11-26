import { Observable, ObservableInput, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResourceModel } from '../models/resource.model';
export abstract class ApiService<T extends ResourceModel<T>> {
  constructor(
    private httpClient: HttpClient,
    private tConstructor: { new (m: Partial<T>, ...args: unknown[]): T },
    protected apiUrl: string,
  ) {}

  private baseUrl = String(environment.API_URL);

  public create(resource: Partial<T>): Observable<any> {
    resource = new this.tConstructor(resource);
    return this.httpClient
      .post<T>(`${this.baseUrl}${this.apiUrl}`, resource)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  public getUser(): Observable<any> {
    return this.httpClient.get<T[]>(`${environment.API_URL}${this.apiUrl}`).pipe(
      map((result: any) => {
        return new this.tConstructor(result);
      }),
    );
  }
  public get(): Observable<any> {
    return this.httpClient
      .get<T[]>(`${this.baseUrl}${this.apiUrl}`)
      .pipe(map((result: any[]) => result.map((res: any) => new this.tConstructor(res))))
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  public getCandidate(): Observable<any> {
    return this.httpClient
      .get<T[]>(`https://jsonplaceholder.typicode.com/comments`)
      .pipe(map((result: any[]) => result.map((res: any) => new this.tConstructor(res))))
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  public getById(id: number): Observable<any> {
    return this.httpClient
      .get<T>(`${this.baseUrl}${this.apiUrl}/${id}`)
      .pipe(map((result: any) => new this.tConstructor(result)))
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  public update(resource: Partial<T>): Observable<any> {
    resource = new this.tConstructor(resource);
    return this.httpClient
      .put<T>(`${this.baseUrl}${this.apiUrl}/${String(resource.id)}`, resource)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  public delete(id: number): Observable<void | any> {
    return this.httpClient
      .delete<void | T>(`${this.baseUrl}${this.apiUrl}/${id}`)
      .pipe(map((result: any) => new this.tConstructor(result)))
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(err: HttpErrorResponse): ObservableInput<any> {
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      console.error(`Backend returned code ${err.status}, body was: ${JSON.stringify(err.error)}`);
    }
    return throwError(err.message || 'server Error');
  }
}
