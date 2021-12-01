import { ResourceModel } from './resource.model';

export class CalendarEventModel extends ResourceModel<CalendarEventModel> {
  ownerId: string;
  summary?: string;
  description?: string;
  startTime: string;
  endTime: string;
  candidateSandboxId?: string;
  members: [
    {
      name: string;
      email: string;
    },
  ];
  id: string;
  type: number;
}
