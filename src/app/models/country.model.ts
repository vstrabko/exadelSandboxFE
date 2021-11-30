import { ResourceModel } from './resource.model';

export class Countries extends ResourceModel<Countries> {
  public id: number;
  public parent_id: null;
  public name: string;
  public areas: Countries[];

  constructor(model?: Partial<Countries>) {
    super(model);
  }
}
