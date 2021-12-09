import { ResourceModel } from './resource.model';

export class CandidateFormModel extends ResourceModel<CandidateFormModel> {
  public sandboxId: string;
  public name: string;
  public surname: string;
  public englishLevelId: string;
  public sandboxPreferredLanguageId: string;
  public primaryTechnologyId: string;
  public phoneNumber: string;
  public skype: string;
  public email: string;
  public location: string;
  public motivation: string;
  public currentJob: string;
  public availabillityTypeId: string;
  public timeContact: string;
  public isJoinToExadel: boolean;
  public isAgreement: boolean;
  public professionaCertificates: string;
  public additionalSkills: string;
}
