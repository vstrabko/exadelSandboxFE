import { Candidate } from 'src/app/models/candidate.model';
import { CandidateServiceFilter } from './../../../services/candidate-filter.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

export class CandidateDataSource implements DataSource<Candidate> {
  private candidateSubject = new BehaviorSubject<Candidate[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private candidateServiceFilter: CandidateServiceFilter) {}
  // eslint-disable-next-line
  connect(collectionViewer: CollectionViewer): Observable<Candidate[]> {
    return this.candidateSubject.asObservable();
  }
  // eslint-disable-next-line
  disconnect(collectionViewer: CollectionViewer): void {
    this.candidateSubject.complete();
    this.loadingSubject.complete();
  }

  loadCandidates(queryParams: { params: { [name: string]: string | number } }): void {
    this.loadingSubject.next(true);

    this.candidateServiceFilter
      .filter(queryParams)
      .subscribe((candidates: Candidate[]) => this.candidateSubject.next(candidates));
  }
}
