export interface ListSandboxes {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  tech?: string;
}

export interface LocalConfig {
  locale_id: string;
}

export interface EventTime {
  startTime: string;
  endTime: string;
  id: number
}

export interface Interval {
  value: string;
}

export interface authResponse {
  accessToken: string;
  refreshToken: string;
}

export interface CalendarEventPost {
  // "ownerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  // "summary": "string",
  // "description": "string",
  startTime: string;
  endTime: string;
}

export interface CalendarEventGet {
  id: "string",
  ownerId: "string",
  summary: "string",
  description: "string",
  startTime: "string",
  endTime: "string",
  type: number,
}

export interface InterviewEvent {
    id: string;
    candidateSandboxId: string;
    startTime: string;
    endTime: string;
}
