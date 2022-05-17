class ClientAPI {
  private auth = '/auth';
  private user = '/user';
  private client = 'client';
  login = `${this.auth}/log-in`;
  signUp = `${this.auth}${this.user}/sign-up`;
  signUpSuccess = (token: string) => `${this.auth}${this.user}/sign-up/${token}`;
  passwordRecover = `${this.auth}${this.user}/password-recover`;
  newPassword = (token: string) => `${this.auth}${this.user}/new-password/${token}`;
  genNewToken = `${this.auth}/gen-new-token`;
  apiCheck = `${this.auth}/api-check`;
  checkValid = `${this.auth}/check-valid`;
  getAllBrand = `${this.client}/brand/get-all`;
  getCar = (name: string, id: number) => `${this.client}/car/get-one/${name}/${id}`;
  getCarByBrandName = (brand: string) => `${this.client}/car/brand/${brand}`;
  getBrand = (brand: string) => `${this.client}/brand/${brand}`;
  getClientData = `/${this.client}/client-data`;
  updateProfile = `/${this.client}/update-client-info`;
  getBlogs = (page: number, limit: number) => `${this.client}/blog?page=${page}&limit=${limit}`;
  getBlog = (id: number) => `${this.client}/blog/${id}`;
  getBlogByOffset = (offset: number) => `${this.client}/blog/offset/${offset}`;
  getPayment = `/${this.client}/payment-receipt`;
  postComment = `${this.client}/car/comment`;
  reactToComment = `${this.client}/car/comment/reaction`;
  updateCommentReaction = `${this.client}/car/comment/reaction/update`;
}

export default new ClientAPI();
