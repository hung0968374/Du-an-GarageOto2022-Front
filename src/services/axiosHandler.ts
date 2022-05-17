import clientAPI from '../common/constants/clientAPI';
import { httpStatus } from '../common/constants/httpsStatus';
import messages from '../common/constants/messages';
import { routerPath } from '../common/constants/routerPath';
import { destroyCookie, destroyLocalStorageItem, setLocalStorageItem } from '../common/helper/storage';
import { ClientRequestAccessToken, InterceptorErrorResponse } from '../reduxToolKit-Saga/types/auth';

import { AxiosClientRequestAccessTokenAPI } from './axiosConnection';

class AxiosHandler {
  async reNewAccessToken() {
    try {
      const { data }: ClientRequestAccessToken = await AxiosClientRequestAccessTokenAPI.post(clientAPI.genNewToken);
      const { headers } = data;

      if (headers.authorization) {
        setLocalStorageItem('token', headers.authorization);
      }
    } catch (error: any) {
      const { data }: InterceptorErrorResponse = error.response;

      if (data.code === httpStatus.Unauthorized && data.message.includes(messages.RefreshTokenExpiry)) {
        destroyCookie('token');
        destroyLocalStorageItem('token');
        alert('Login session expired, please login again');
        window.location.pathname = routerPath.auth.LOG_IN;
      }
    }
  }
}

export default new AxiosHandler();
