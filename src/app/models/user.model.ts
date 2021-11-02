import { ResourceModel } from './resource.model';

export class User extends ResourceModel<User> {
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;

  constructor(model?: Partial<User>) {
    super(model);
  }
  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  get mail(): string {
    return this.email;
  }
  get pass(): string {
    return this.password;
  }
}
