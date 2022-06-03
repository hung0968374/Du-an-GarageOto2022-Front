import { ClientDetailAttributes } from '../../redux/common/User/ClientSlice';

interface TokenType {
  authorization: string;
}

interface LoginDataReturn {
  statusCode: number;
  headers: TokenType;
  body: TokenType;
  userInfo: ClientDetailAttributes;
}

interface LoginReturn {
  status: number;
  data: LoginDataReturn;
}

interface UndefinedObject {
  [key: string]: any;
}

export type { LoginReturn, LoginDataReturn, UndefinedObject };
