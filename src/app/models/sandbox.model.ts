import { ResourceModel } from './resource.model';

export class Sandbox extends ResourceModel<Sandbox> {
  public id: number;
  public title: string;

  constructor(model?: Partial<Sandbox>) {
    super(model);
  }
}
