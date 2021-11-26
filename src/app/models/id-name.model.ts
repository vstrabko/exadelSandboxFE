import { ResourceModel } from './resource.model';

export class IdName extends ResourceModel<IdName> {
  public id: string;
  public name: string;
  

  constructor(model?: Partial<IdName>) {
    super(model);
  }
}
