import { ResourceModel } from './resource.model';

export class Interviewer extends ResourceModel<Interviewer> {
  public id: number;
  public name: string;
  public surname: string;
  public email: string;
  public location: string;

  constructor(model?: Partial<Interviewer>) {
    super(model);
  }
}
