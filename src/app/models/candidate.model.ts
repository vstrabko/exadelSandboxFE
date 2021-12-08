import { ResourceModel } from './resource.model';
import { IdName } from './id-name.model';
import {
  CandidateLanguages,
  CandidateTechSkills,
  CandidateSandboxes,
} from '../interfaces/interfaces';

export class Candidate extends ResourceModel<Candidate> {
  public id: string;
  public name: string;
  public surname: string;
  public email: string;
  public location: IdName;
  public skype: string;
  public phone: string;
  public professionaCertificates: string;
  public additionalSkills: string;
  public candidateLanguages: CandidateLanguages[];
  public candidateTechSkills: CandidateTechSkills[];
  public candidateSandboxes: CandidateSandboxes[];

  constructor(model?: Partial<Candidate>) {
    super(model);
  }
}