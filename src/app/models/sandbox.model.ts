import { ResourceModel } from './resource.model';
import { IdName } from './id-name.model';

export class Sandbox extends ResourceModel<Sandbox> {
  public id: string;
  public name: string;
  public description: string;
  public maxCandidates: number;
  public createDate: string;
  public startDate: string;
  public endDate: string;
  public startRegistration: string;
  public endRegistration: string;
  public status: string;
  public stackTechnologies: IdName[];
  public languages: IdName[];
  public interviewers: IdName[];
  public recruiters: IdName[];
  public mentors: IdName[];
  constructor(model?: Partial<Sandbox>) {
    super(model);
  }
}
