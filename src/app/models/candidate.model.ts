import { ResourceModel } from './resource.model';

export class Candidate extends ResourceModel<Candidate> {
  public id: string;
  public name: string;
  public surname: string;
  public email: string;
  public location: {
    name: string;
    id: string;
  };
  public skype: string;
  public phone: string;
  public professionaCertificates: string;
  public additionalSkills: string;
  public candidateLanguages: [
    {
      id: string;
      language: {
        id: string;
        name: string;
      };
      languageLevel: {
        orderLevel: number;
        name: string;
        id: string;
      };
    },
  ];
  public candidateTechSkills: [null];
  public candidateSandboxes: [
    {
      id: string;
      sandbox: {
        id: string;
        name: string;
        description: string;
        maxCandidates: number;
        createDate: string;
        startDate: string;
        endDate: string;
        startRegistration: string;
        endRegistration: string;
        status: string;
        stackTechnologies: null;
        languages: null;
        mentors: null;
        recruiters: null;
        interviewers: null;
      };
      currentJob: string;
      candidateProcesses: [
        {
          id: string;
          status: {
            name: string;
            id: string;
          };
          testResult: string;
          createDate: string;
          feedbacks: [null];
        },
      ];
      candidateProjectRole: null;
    },
  ];

  constructor(model?: Partial<Candidate>) {
    super(model);
  }
}
