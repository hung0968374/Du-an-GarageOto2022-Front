interface TokenType {
  authorization: string;
}

interface LoginDataReturn {
  statusCode: number;
  headers: TokenType;
  body: TokenType;
  userInfo?: unknown;
}

interface LoginReturn {
  status: number;
  data: LoginDataReturn;
}

interface UndefinedObject {
  [key: string]: any;
}

export type { LoginReturn, LoginDataReturn, UndefinedObject };
