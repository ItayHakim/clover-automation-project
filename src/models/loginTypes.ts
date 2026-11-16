export type LoginUserType = {
  testId: string;
  name: string;
  username: string;
  isSlow?: boolean;
  assertionTimeout?: number;
};

export type RejectedLoginCaseType = {
  testId: string;
  name: string;
  username: string;
  password: string;
  errorMessage: string;
  expectsSessionCookie?: boolean;
};
