import { ResourceModel } from './resource.model';
import { InterviewEvent } from './interviewEvent.model'

export class CalendarEventModel extends ResourceModel<CalendarEventModel> {
  public id: string;
  public interviewerId: string;
  public name: string;
  public surname: string;
  public startTime: string;
  public endTime: string;
  public interviewEvents: InterviewEvent[];

  constructor(model?: Partial<CalendarEventModel>) {
    super(model);
  }
}
