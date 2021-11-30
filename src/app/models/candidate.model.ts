import { ResourceModel } from './resource.model';

export class Candidate extends ResourceModel<Candidate> {
  public id: string;
  public name: string;
  public lastName: string;
  public email: string;

  constructor(model?: Partial<Candidate>) {
    super(model);
  }
}
