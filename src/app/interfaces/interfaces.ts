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

export interface Interval {
  value: string;
}

export interface authResponse {
  accessToken: string;
  refreshToken: string;
}
