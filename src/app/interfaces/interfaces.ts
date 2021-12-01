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

export interface Interval {
  value: string;
}

export interface authResponse {
  accessToken: string;
  refreshToken: string;
}
