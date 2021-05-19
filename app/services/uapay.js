const axios = require('axios');
const jwt = require('jsonwebtoken');

const secret = require('../secret');

class UAPayService {
  static get apiURL() {
    return 'https://api.demo.uapay.ua/api';
  }

  static get redirectUrl() {
    return 'http://localhost:3000/redirect'
  }

  static get clientId() {
    return '6591';
  }

  static get callbackURL() {
    return '';
  }

  static get secret() {
    return secret;
  }

  static makeApiRequest(method, params, data) {
    const iat = (new Date()).getTime() / 1000;
    const payloadObject = {params, iat};    
    
    if (data) {
      payloadObject.data = data;
    }

    const token = jwt.sign(payloadObject, secret, {algorithm: 'HS256'});

    return axios.post(UAPayService.apiURL + method, {...payloadObject, token});
  }

  static decodeApiResponse(token) {
    return jwt.decode(token);
  }

  static async createSession() {    
    const params = {
      clientId: UAPayService.clientId
    }

    const res = await UAPayService.makeApiRequest('/sessions/create', params);
    if (res.data.error) {
      throw res.data.error;
    } else {
      return UAPayService.decodeApiResponse(res.data.data.token);
    }
  }

  static async createInvoiceECOM(sessionId) {
    const params = {sessionId, systemType: 'ECOM'};
    const data = {
      externalId: '1',
      type: 'PAY',
      reusability: false,
      description: 'My test ECOM invoice',
      // if type == SUBSCRIBE
      amount: 10000,
      // recurringInterval
      // expiresAt
      redirectUrl: UAPayService.redirectUrl,
      extraInfo: JSON.stringify({foo: 'bar'}),
      email: 'ivansyvak1991@gmail.com',
      // services: [
      //   {
      //     serviceId: '1457',
      //     destination: 'some destination 1',
      //     destinationName: 'Отримувач 1',
      //     description: 'some description 1',
      //     amount: 50,
      //     callbackUrl: ''
      //   },
      // ]       
    };

    const res = await UAPayService.makeApiRequest('/invoicer/invoices/create', params, data);
    
    if (res.data.error) {
      throw res.data.error;
    } else {
      return UAPayService.decodeApiResponse(res.data.data.token);
    }
  }
}

module.exports = UAPayService;
