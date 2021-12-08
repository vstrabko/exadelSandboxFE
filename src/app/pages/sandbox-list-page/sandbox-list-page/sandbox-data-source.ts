import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sandbox } from 'src/app/models/sandbox.model';
import { SandboxServiceFilter } from 'src/app/services/sandboxFilter-service';

export class SandboxDataSource implements DataSource<Sandbox> {
  public sandboxSubject = new BehaviorSubject<Sandbox[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private sandboxServiceFilter: SandboxServiceFilter) {}
  // eslint-disable-next-line
  connect(collectionViewer: CollectionViewer): Observable<Sandbox[]> {
    return this.sandboxSubject.asObservable();
  }
  // eslint-disable-next-line
  disconnect(collectionViewer: CollectionViewer): void {
    this.sandboxSubject.complete();
    this.loadingSubject.complete();
  }

  loadSandboxes(queryParams: { params: { [name: string]: string | number } }): void {
    this.loadingSubject.next(true);

    this.sandboxServiceFilter
      .filter(queryParams)
      .subscribe((sandbox: Sandbox[]) => this.sandboxSubject.next(sandbox));
  }
}
