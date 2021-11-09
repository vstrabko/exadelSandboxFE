import { ResourceModel } from './resource.model';

export class skills extends ResourceModel<skills> {
  public id: number;
  public name: string;

  constructor(model?: Partial<skills>) {
    super(model);
  }
}
