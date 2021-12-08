import { ResourceModel } from './resource.model';

export class Event extends ResourceModel<Event> {
  id: string;
  type: number;
  candidateSandboxId: string;
  members: [];
  ownerId: string;
  summary: string;
  description: null;
  startTime: string;
  endTime: string;

  constructor(model?: Partial<Event>) {
    super(model);
  }
}
