import { ResourceModel } from './resource.model';

export class candidateRequestData extends ResourceModel<candidateRequestData> {
  public id: string;
  public name: string;

  constructor(model?: Partial<candidateRequestData>) {
    super(model);
  }
}
