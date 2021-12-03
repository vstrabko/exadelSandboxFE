import { ResourceModel } from './resource.model';
import { Sandbox } from './sandbox.model';
import { IdName } from './id-name.model';

interface CandidateLanguages {
  id: string;
  language: IdName;
  languageLevel: {
    orderLevel: number;
    name: string;
    id: string;
  };
}

interface CandidateTechSkills {
  id: string;
  skill: IdName;
}

interface Feedbacks {
  id: string;
  userId: string;
  author: string;
  grade: number;
  createDate: string;
  userReview: string;
  candidateProccesId: string;
}

interface CandidateProcesses {
  id: string;
  status: IdName;
  testResult: string;
  createDate: string;
  feedbacks: Feedbacks[];
}

export interface CandidateSandboxes {
  id: string;
  sandbox: Sandbox;
  currentJob: string;
  candidateProcesses: CandidateProcesses[];
  candidateProjectRole: IdName;
}

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
