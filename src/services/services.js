/**
 * 通用请求接口
 */

import qs from 'qs';
import _ from 'lodash';
import fetch from 'dva/fetch';
import { DEFAULT_OPTIONS, BASE_URL } from '../constants/config';
import request from '../utils/request';

export function urlFix(url) {
  if (!url || url.startsWith('http') || url.startsWith('https')) return url;
  if (url.startsWith('/')) {
    return `${BASE_URL}${url}`;
  }
}

/**
 * 通用的get接口
 * @param url
 * @returns {Object}
 */
export function get(url, params = {}) {
  return request(`${urlFix(url)}${!_.isEmpty(params) ? `?${qs.stringify(params)}` : ''}`, DEFAULT_OPTIONS);
}

/**
 * 通用post
 * @param url
 * @param query
 * @param body
 * @returns {Object}
 */
export function post(url, query = {}, body = {}) {
  return request(`${urlFix(url)}`, {
    method: 'POST',
    body: JSON.stringify(body, null, 0),
  });
}

export function postForm(url, query = {}, body = {}) {
  const fd = new FormData();

  _.forIn(body, (value, key) => {
    fd.append(key, value);
  });

  return request(`${urlFix(url)}`, {
    method: 'POST',
    body: fd,
  });
}


/**
 * 获取默认更新接口
 * @param url
 * @param query
 * @param body
 * @returns {Object}
 */
export function put(url, query = {}, body = {}) {
  return request(`${urlFix(url)}`, Object.assign({}, DEFAULT_OPTIONS, {
    method: 'PUT',
    body: JSON.stringify(body, null, 0),
  }));
}

/**
 * 获取默认更新接口
 * @param url
 * @param query
 * @param body
 * @returns {Object}
 */
export function patch(url, query = {}, body = {}) {
  return request(`${url}`, Object.assign({}, DEFAULT_OPTIONS, {
    method: 'PATCH',
    body: JSON.stringify(body, null, 0),
  }));
}

/**
 * 获取默认删除接口
 * @param url
 * @param query
 * @param body
 * @returns {Object}
 */
export function remove(url, query = {}, body = {}) {
  return request(`${url}`, Object.assign({}, DEFAULT_OPTIONS, {
    method: 'DELETE',
    body: JSON.stringify(body, null, 0),
  }));
}

/**
 * 默认上传接口
 * @param url
 * @param query
 * @param body
 * @returns {Object}
 */

export function upload(url, body) {
  return request(`${url}`, Object.assign({}, {
    method: 'POST',
    body,
    headers: {},
  }));
}

export function exportFile(url, params = {}, body = {}) {
  return fetch(`${url}${!_.isEmpty(params) ? `?${qs.stringify(params)}` : ''}`, Object.assign({}, DEFAULT_OPTIONS, {
    method: 'POST',
  })).then((res) => {
    if (res.ok) {
      return {
        file: res.blob(),
      };
    }
  }).then(data => ({ data }));
}
