import { ResourceModel } from './resource.model';
import { IdName } from './id-name.model';
import { Employee } from '../interfaces/interfaces';

export class SandboxExel extends ResourceModel<SandboxExel> {
  public id?: string;
  public name: string;
  public description: string;
  public maxCandidates: number;
  public createDate: string;
  public startDate: string;
  public endDate?: string;
  public startRegistration?: string;
  public endRegistration?: string;
  public status: string;
  public stackTechnologies: IdName[];
  public languages: IdName[];
  public formatStartDate: string;
  public interviewers: Employee[];
  public recruiters: Employee[];
  public mentors: Employee[];

  constructor(model?: Partial<SandboxExel>) {
    super(model);
  }
}
