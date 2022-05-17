export const routerPath = {
  auth: {
    PASSWORD_RECOVER: '/auth/user/password-recover',
    NEW_PASSWORD: '/auth/user/password-recover/validate/:token',
    LOG_IN: '/auth/user/log-in',
    SIGN_UP: '/auth/user/sign-up',
    SIGN_UP_SUCCESS: '/auth/user/sign-up/validate/:token',
    MY_ACCOUNT: '/auth/my-account/',
  },
  common: {
    HOME: '/home',
    ERROR: '/error',
    BRAND: '/brand',
    BLOGS: '/blogs',
    BLOG_ITEM: '/blog',
    EDIT: '/edit',
    BRAND_ITEM: '/brand/:brandName',
    CAR_DETAIL: '/brand/:brandName/:car/:id',
  },
};

export const pathArrayName = (): string[] => {
  const arrayResult: string[] = [];

  for (const [, value] of Object.entries(routerPath)) {
    if (typeof value === 'object') {
      for (const [, secondValue] of Object.entries(value)) {
        arrayResult.push(secondValue);
      }
    } else if (typeof value === 'string') {
      arrayResult.push(value);
    }
  }

  return arrayResult;
};
