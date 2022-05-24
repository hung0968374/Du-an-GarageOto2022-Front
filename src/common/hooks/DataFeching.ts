import React from 'react';
import axios, { AxiosResponse, Method } from 'axios';

import ServiceTypes from '../../services/types';
import AxiosHandler from '../../services/axiosHandler';
import { getLocalStorageItem } from '../helper/storage';
import { httpStatus } from '../constants/httpsStatus';
import ClientMessages from '../constants/messages';

// OutputDataType is define as type of output data
// DataType is define as type of input data

export function useFetch<OutputDataType = any, InputDataType = any>(
  url: string,
  method: Method,
  data?: InputDataType,
  needToken?: boolean,
) {
  const [inputData, setInputData] = React.useState<InputDataType | undefined>(data);
  const [outputData, setOutputData] = React.useState<OutputDataType>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const functionFetchData = React.useCallback(async (): Promise<OutputDataType> => {
    const response: AxiosResponse<OutputDataType> = await axios.request({
      method,
      url: ServiceTypes.BASE_URL + url,
      headers: {
        Authorization: needToken ? (getLocalStorageItem('token') as string) : '',
      },
      data: inputData,
    });
    return response.data;
  }, [method, url, needToken, inputData]);

  const beginFetchData = React.useCallback(async () => {
    try {
      //To actually fetch data we must use setLoading(true)
      if (loading) {
        const value = await functionFetchData();
        setOutputData(value);
        setLoading((prev) => !prev);
      }
    } catch (error: any) {
      const errorResponse: AxiosResponse = error.response;

      //if status is 401 and response is access token expires we will get it back and call API again
      const getAccessToken = async (): Promise<void> => AxiosHandler.reNewAccessToken();
      if (
        errorResponse.status === httpStatus.Unauthorized &&
        errorResponse.data.message.includes(ClientMessages.AccessTokenExpiry)
      ) {
        await getAccessToken();
        await functionFetchData();
      } else {
        setErrorMessage(errorResponse.data.message);
      }

      setLoading((prev) => !prev);
    }
    //We dont use finally here because is have too many problems to solve
  }, [loading, functionFetchData]);

  React.useEffect(() => {
    beginFetchData();
  }, [beginFetchData]);

  return [outputData, errorMessage, setInputData, setLoading, loading] as const;
}
