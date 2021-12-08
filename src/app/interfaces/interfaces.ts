import { IdName } from '../models/id-name.model';
import { Sandbox } from '../models/sandbox.model';
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

export interface dateRange {
  start: Date;
  end: Date;
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

export interface CandidateLanguages {
  id: string;
  language: IdName;
  languageLevel: {
    orderLevel: number;
    name: string;
    id: string;
  };
}

export interface CandidateTechSkills {
  id: string;
  skill: IdName;
}

export interface Feedbacks {
  id: string;
  userId: string;
  author: string;
  grade: number;
  createDate: string;
  userReview: string;
  candidateProccesId: string;
}

export interface CandidateProcesses {
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

export interface Feedback {
  author: string;
  candidateProccesId: string;
  createDate: string;
  grade: number;
  id: string;
  userId: string;
  userReview: string;
}
