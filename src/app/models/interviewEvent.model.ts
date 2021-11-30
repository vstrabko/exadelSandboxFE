import { ResourceModel } from './resource.model';

export class InterviewEvent extends ResourceModel<InterviewEvent> {
  public id: string;
  public candidateSandboxId: string;
  public startTime: string;
  public endTime: string;

  constructor(model?: Partial<InterviewEvent>) {
    super(model);
  }
}
