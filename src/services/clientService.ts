import axios from 'axios';

import clientAPI from '../common/constants/clientAPI';
import thirdPartyAPI from '../common/constants/thirdPartyAPI';
import {
  ClientLogin,
  ClientNewPassword,
  ClientPasswordRecover,
  ClientSignUp,
  CommentInterface,
} from '../common/interfaces/Auth';
import { LoginDataReturn } from '../common/interfaces/Client';
import { BlogItemInterface } from '../pages/client/blog/BlogItem';
import { CommentReaction } from '../pages/client/carDetail/CarDetailComment';
import {
  ClientInfo,
  DistrictAttributes,
  DistrictInfo,
  PaymentInfo,
  PaymentReceipt,
  ProvinceAttributes,
  ProvinceInfo,
  UpdateClientInfoAttributes,
  User,
  WardAttributes,
  WardInfo,
} from '../reduxToolKit-Saga/types/auth';

import { AxiosClient, AxiosClientAPI } from './axiosConnection';

class ClientService {
  async login(params: ClientLogin): Promise<LoginDataReturn> {
    const { data } = await AxiosClient.post(clientAPI.login, params);
    return data;
  }

  async userSignUp(params: ClientSignUp) {
    const { data } = await AxiosClient.post(clientAPI.signUp, params);
    return data;
  }

  async userSignUpSuccess(token: string) {
    const { data } = await AxiosClient.post(clientAPI.signUpSuccess(token));
    return data;
  }

  async userPasswordRecover(params: ClientPasswordRecover) {
    const { data } = await AxiosClient.post(clientAPI.passwordRecover, params);
    return data;
  }

  async userNewPassword(token: string, params: ClientNewPassword) {
    const { data } = await AxiosClient.post(clientAPI.newPassword(token), params);
    return data;
  }

  async getAllBrand() {
    const { data } = await AxiosClient.get(clientAPI.getAllBrand);
    return data;
  }

  async getCar(name: string, id: number) {
    const { data } = await AxiosClient.get(clientAPI.getCar(name, id));
    return data;
  }

  async getCarByBrandName(brand: string) {
    const { data } = await AxiosClient.get(clientAPI.getCarByBrandName(brand));
    return data;
  }

  async getBrand(brand: string) {
    const { data } = await AxiosClient.get(clientAPI.getBrand(brand));
    return data;
  }

  async getClientData(): Promise<User> {
    const response: ClientInfo = await AxiosClientAPI.get(clientAPI.getClientData);
    return response.data;
  }

  async getListProvince(): Promise<ProvinceAttributes[]> {
    const response: ProvinceInfo = await axios.get(thirdPartyAPI.getProvince);
    return response.data.results;
  }

  async getListDistrict(provinceId: string): Promise<DistrictAttributes[]> {
    const response: DistrictInfo = await axios.get(thirdPartyAPI.getDistrict(provinceId));
    return response.data.results;
  }

  async getListWard(districtId: string): Promise<WardAttributes[]> {
    const response: WardInfo = await axios.get(thirdPartyAPI.getWard(districtId));
    return response.data.results;
  }

  async updateCLientInfo(data: UpdateClientInfoAttributes): Promise<void> {
    await AxiosClientAPI.patch(clientAPI.updateProfile, data);
  }
  async getBlogs(page: number, limit = 10) {
    return AxiosClient.get(clientAPI.getBlogs(page, limit));
  }
  async getBlog(id: number): Promise<BlogItemInterface> {
    return AxiosClient.get(clientAPI.getBlog(id));
  }
  async getBlogByOffset(offset: number): Promise<BlogItemInterface> {
    return AxiosClient.get(clientAPI.getBlogByOffset(offset));
  }

  async getPaymentReceipt(): Promise<PaymentReceipt[]> {
    const response: PaymentInfo = await AxiosClientAPI.get(clientAPI.getPayment);
    return response.data;
  }
  async postComment(comment: CommentInterface) {
    return AxiosClient.post(clientAPI.postComment, comment);
  }
  async reactToComment(reaction: CommentReaction) {
    return AxiosClient.post(clientAPI.reactToComment, reaction);
  }
  async updateCommentReaction(reaction: CommentReaction) {
    return AxiosClient.patch(clientAPI.updateCommentReaction, reaction);
  }
}

export default new ClientService();
