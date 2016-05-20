export interface InjectableDependency {
  src: string;
  inject: string | boolean;
  vendor?: boolean;
  env?: string[] | string;
  relativeSrc?: string;
}

export interface Environments {
  DEVELOPMENT: string;
  PRODUCTION: string;
  TEST: string;
  E2E: string;
  UNKNOWN: string;

  [key: string]: string;
}

