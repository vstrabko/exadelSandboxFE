import { ResourceModel } from './resource.model';

export class candidateRequestData extends ResourceModel<candidateRequestData> {
  public id: number;
  public name: string;

  constructor(model?: Partial<candidateRequestData>) {
    super(model);
  }
}
