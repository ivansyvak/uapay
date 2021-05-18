const axios = require('axios');
const jwt = require('jsonwebtoken');

const secret = require('../secret');

class UAPayService {
  static get apiURL() {
    return 'https://api.demo.uapay.ua/api';
  }

  static get clientId() {
    return 6591;
  }

  static get secret() {
    return secret;
  }

  static makeApiRequest(method, params) {
    const iat = (new Date()).getTime();
    const payloadObject = {params, iat};    
    const token = jwt.sign(payloadObject, secret, {algorithm: 'HS256'});

    return axios.post(UAPayService.apiURL + method, {params, iat, token});
  }

  static createSession() {    
    const params = {
      clientId: UAPayService.clientId
    }

    return UAPayService.makeApiRequest('/sessions/create', params);
  }
}

module.exports = UAPayService;
