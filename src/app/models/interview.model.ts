import { ResourceModel } from './resource.model';

interface membersObj {
  name: string;
  email: string;
}

export class Interview extends ResourceModel<Interview> {
  ownerId: string;
  summary: string;
  description: string;
  startTime: string;
  endTime: string;
  candidateSandboxId: string;
  members: membersObj[];

  constructor(model?: Partial<Interview>) {
    super(model);
  }
}
