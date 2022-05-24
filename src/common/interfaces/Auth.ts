import * as Yup from 'yup';

export interface AdminLogin {
  email: string;
  passcode: string;
}

export interface AdminAccountCreate {
  email: string;
  roles: string;
}

export interface AdminPasscodeRecover {
  email: string;
  roles: string;
}

export interface ClientSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gCaptcha: string;
  roles: string;
}

export interface ClientLogin {
  email: string;
  password: string;
}
export interface ClientPasswordRecover {
  email: string;
}

export interface ClientNewPassword {
  password: string;
}

export interface CommentInterface {
  id?: number;
  carId: number;
  comment: string;
  mom?: string;
  userId: number;
}
export interface FilterBrandItemInput {
  brandName: string;
  designType: string;
  price: string;
  seat: string;
  radio: string;
}

export enum UserRoles {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  EXPERT = 'EXPERT',
  SALE = 'SALE',
}

export interface UserWishListBody {
  listCarId: Array<number>;
  takeAction: boolean;
}
export interface PaymentBody {
  carId: number;
  quantity: number;
}

class AuthInterfaces {
  private validateRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  public clientLoginSchema;
  public clientSignUpSchema;
  public clientPasswordRecoverSchema;
  public clientNewPasswordSchema;
  public adminLoginSchema;
  public adminAccountCreateSchema;
  public adminPasscodeRecoverSchema;

  constructor() {
    this.clientLoginSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .min(16, 'Your email is too short')
        .max(40, 'Your email is too long')
        .required('This field can not be empty'),
      password: Yup.string()
        .min(6, 'Incorrect password length')
        .max(30, 'Incorrect password length')
        .required('This field can not be empty'),
    });

    this.clientSignUpSchema = Yup.object().shape({
      firstName: Yup.string(),
      lastName: Yup.string(),
      email: Yup.string()
        .email()
        .min(16, 'Your email is too short')
        .max(40, 'Your email is too long')
        .required('This field can not be empty'),
      password: Yup.string()
        .min(6, 'Incorrect password length')
        .max(30, 'Incorrect password length')
        .required('This field can not be empty')
        .matches(
          this.validateRegEx,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
        ),
      reTypePassword: Yup.string()
        .min(6, 'Incorrect password length')
        .max(30, 'Incorrect password length')
        .required('This field can not be empty')
        .oneOf([Yup.ref('password')], "Password retype doesn't match "),
      gCaptcha: Yup.string(),
      roles: Yup.string(),
    });

    this.clientPasswordRecoverSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .min(16, 'Your email is too short')
        .max(40, 'Your email is too long')
        .required('This field can not be empty'),
    });

    this.clientNewPasswordSchema = Yup.object().shape({
      password: Yup.string()
        .min(6, 'Incorrect password length')
        .max(30, 'Incorrect password length')
        .required('This field can not be empty')
        .matches(
          this.validateRegEx,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
        ),
      retypePassword: Yup.string()
        .min(6, 'Incorrect password length')
        .max(30, 'Incorrect password length')
        .required('This field can not be empty')
        .oneOf([Yup.ref('password')], "Password retype doesn't match "),
    });

    this.adminAccountCreateSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .min(16, 'Your email is too short')
        .max(40, 'Your email is too long')
        .required('This field can not be empty'),
      roles: Yup.string().notOneOf(
        [Yup.ref(UserRoles.CLIENT), Yup.ref(UserRoles.ADMIN), Yup.ref(UserRoles.SALE), Yup.ref(UserRoles.EXPERT)],
        `Account roles must be one of ${UserRoles.CLIENT}, ${UserRoles.ADMIN},${UserRoles.EXPERT},${UserRoles.SALE}, `,
      ),
    });

    this.adminLoginSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .min(16, 'Your email is too short')
        .max(40, 'Your email is too long')
        .required('This field can not be empty'),
      passcode: Yup.string()
        .required('This field can not be empty')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .test('len', 'Must be exactly 6 numbers', (val) => val?.length === 6),
    });

    this.adminPasscodeRecoverSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .min(16, 'Your email is too short')
        .max(40, 'Your email is too long')
        .required('This field can not be empty'),
      roles: Yup.string().notOneOf(
        [Yup.ref(UserRoles.CLIENT), Yup.ref(UserRoles.ADMIN), Yup.ref(UserRoles.SALE), Yup.ref(UserRoles.EXPERT)],
        `Account roles must be one of ${UserRoles.CLIENT}, ${UserRoles.ADMIN},${UserRoles.EXPERT},${UserRoles.SALE}, `,
      ),
    });
  }
}

export default new AuthInterfaces();
