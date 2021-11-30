export interface ListSandboxes {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
  surname: string;
  email: string;
  location: string;
}

export interface LocalConfig {
  locale_id: string;
}

export interface EventTime {
  startTime: string;
  endTime: string;
  id: number;
}

export interface Interval {
  value: string;
}

export interface authResponse {
  accessToken: string;
  refreshToken: string;
}

export interface CalendarEventPost {
  ownerId: string;
  summary?: string;
  description?: string;
  startTime: string;
  endTime: string;
}

export interface CalendarEventGet {
  id: 'string';
  ownerId: 'string';
  summary: 'string';
  description: 'string';
  startTime: 'string';
  endTime: 'string';
  type: number;
}

export interface InterviewEvent {
  id: string;
  candidateSandboxId: string;
  startTime: string;
  endTime: string;
}
