class ThirdPartyAPI {
  getProvince = 'https://vapi.vnappmob.com/api/province';
  getDistrict = (provinceId: string) => `https://vapi.vnappmob.com/api/province/district/${provinceId}`;
  getWard = (districtId: string) => `https://vapi.vnappmob.com/api/province/ward/${districtId}`;
}

export default new ThirdPartyAPI();
