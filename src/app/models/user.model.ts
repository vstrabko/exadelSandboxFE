import { ResourceModel } from './resource.model';

export class User extends ResourceModel<User> {
  private id: string;
  private name: string;
  private surname: string;
  private location: null;
  private email: string;
  private password: string;
  private skype: null;
  private phone: null;
  public userSanboxes: [];
  public userTechSkills: [];
  public userRoles: [];
  public userLanguages: [];
  private feedbacks: [];
  public userStackTechnologies: [];

  constructor(model?: Partial<User>) {
    super(model);
  }
  get fullName(): string {
    return `${this.name} ${this.surname}`;
  }
}
