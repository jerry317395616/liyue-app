/**
 * 默认的全局配置
 */


export default {
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',
  timeout: 30000,
  // #ifndef MP-ALIPAY || APP-PLUS
  responseType: 'text',
  // #endif
  custom: {},
  // #ifdef APP-PLUS
  sslVerify: true,
  // #endif
  // #ifdef H5
  withCredentials: false,
  // #endif
  // #ifdef APP-PLUS
  firstIpv4: false,
  // #endif
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300
  }
}
