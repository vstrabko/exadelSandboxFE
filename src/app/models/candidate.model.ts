import { ResourceModel } from './resource.model';

export class Candidate extends ResourceModel<Candidate> {
  public id: number;
  public name: string;
  public lastName: string;
  public email: string;
  public id: number;

  constructor(model?: Partial<Candidate>) {
    super(model);
  }
}
