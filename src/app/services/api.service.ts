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

  public create(resource: Partial<T> & { toJson: () => T }): Observable<any> {
    return this.httpClient
      .post<T>(`${this.baseUrl}${this.apiUrl}`, resource.toJson())
      .pipe(map((result: any) => new this.tConstructor(result)))
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  public get(): Observable<any> {
    return this.httpClient
      .get<T[]>(`${this.baseUrl}${this.apiUrl}`)
      .pipe(map((result: any[]) => result.map((res: any) => new this.tConstructor(res))))
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  public filter(queryParams: { params: { [name: string]: string | number } }): Observable<any> {
    return this.httpClient
      .get<T[]>(`${this.baseUrl}${this.apiUrl}`, queryParams)
      .pipe(
        map((result: Partial<T>[]) => result.map((res: Partial<T>) => new this.tConstructor(res))),
      )
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  public getById(id: number): Observable<any> {
    return this.httpClient
      .get<T>(`${this.baseUrl}${this.apiUrl}/${id}`)
      .pipe(map((result: any) => new this.tConstructor(result)))
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  public update(resource: Partial<T> & { toJson: () => T }): Observable<any> {
    return this.httpClient
      .put<T>(`${this.baseUrl}${this.apiUrl}/${String(resource._id)}`, resource.toJson())
      .pipe(map((result: any) => new this.tConstructor(result)))
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
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${err.status}, body was: ${String(err.error)}`);
    }

    // ...optionally return a default fallback value so app can continue (pick one)
    // which could be a default value (which has to be a HttpResponse here)
    // return Observable.of(new HttpResponse({body: [{name: "Default value..."}]}));
    // or simply an empty observable
    return throwError(err.message || 'server Error');
  }
}
