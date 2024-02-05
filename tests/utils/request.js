const { Client } = require('undici');

const dotenv = require('dotenv').config({ path: 'tests/.env' });

const BASE_URL = `http://localhost:${dotenv.parsed.PORT}`;

const HTTP_METHODS = require('../../constants/httpMethods');

class Api {
  constructor() {
    this.httpClient = new Client(BASE_URL);
  }

  post({ path = '', data = {}, responseType = 'json', token = '', disableToken = false }) {
    return this._send({
      method: HTTP_METHODS.POST,
      path,
      data,
      responseType,
      token,
      disableToken,
    });
  }

  put({ path = '', data = {}, token = '', disableToken = false }) {
    return this._send({ method: HTTP_METHODS.PUT, path, data, token, disableToken });
  }

  patch({ path = '', data = {}, token = '', disableToken = false }) {
    return this._send({
      method: HTTP_METHODS.PATCH,
      path,
      data,
      token,
      disableToken,
    });
  }

  get({
    path = '',
    data = {},
    params = {},
    responseType = 'json',
    token = '',
    disableToken = false,
  }) {
    return this._send({
      method: HTTP_METHODS.GET,
      path,
      data,
      params,
      responseType,
      token,
      disableToken,
    });
  }

  delete({ path = '', data = {}, token = '', disableToken = false }) {
    return this._send({
      method: HTTP_METHODS.DELETE,
      path,
      data,
      token,
      disableToken,
    });
  }

  async _send({
    method = HTTP_METHODS.GET,
    path = '',
    data = {},
    params = {},
    token = '',
    disableToken = false,
    stringifyBody = true,
  }) {
    try {
      const headers = { 'content-type': 'application/json', 'cache-control': 'no-cache' };

      const tokenLocal = token || global?.SUPER_ADMIN?.TOKEN;

      if (tokenLocal && disableToken !== true) {
        headers.jwt = `Bearer ${tokenLocal}`;

        headers.authorization = `Bearer ${tokenLocal}`;
      }

      const response = await this.httpClient.request({
        method,
        path,
        headers,
        query: params,
        body: stringifyBody ? JSON.stringify(data) : data,
      });

      return { data: await response.body.json(), status: response.statusCode };
    } catch (error) {
      return {
        statusText: error?.statusText || error?.message,
        status: error?.statusCode || error?.status,
      };
    }
  }
}

module.exports = new Api();
