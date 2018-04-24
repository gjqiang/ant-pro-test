/**
 * 常量文件
 */

export const ENV = process.env.NODE_ENV;

export const BASE_URL = 'http://cyb.ngrok.gznuode.cn/weilairensheng';

export const DEFAULT_OPTIONS = {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const backend = ENV === 'development' ? BASE_URL : '/';

export const QINIU_CONFIG = {
  uptokenUrl : `${BASE_URL}/getQiNiuToken.do`,
  name : 'alphaking',
  domain : 'http://resources.productshow.cn/',
};

export const PAGE_SIZE = 20;

export const PLAN_TIME_FORMAT = 'YYYY-MM-DD';
