import { ResourceModel } from './resource.model';

export class User extends ResourceModel<User> {
  public firstname: string;
  public lastName: string;
  public email: string;

  constructor(model?: Partial<User>) {
    super(model);
  }
}
