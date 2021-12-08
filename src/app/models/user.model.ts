import { ResourceModel } from './resource.model';

export class User extends ResourceModel<User> {
  public id: string;
  private name: string;
  private surname: string;
  private email: string;
  public location: string;
  private roles: string[];

  constructor(model?: Partial<User>) {
    super(model);
  }

  get fullName(): string {
    return `${this.name} ${this.surname}`;
  }

  get _id(): string {
    return `${this.id}`;
  }

  get _roles(): string[] {
    return this.roles;
  }
}
