import * as Server from '../services/services';
import { notification } from 'antd';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
  },

  effects: {
    *fetch_userInfo({ url, location }, { call, put }) {
      const data = yield call(Server.get, url);
      if (data.code === 3 && location.pathname !== '/user/login') {
        notification.error({
          message: data.retMsg,
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {
    setup(props) {
      const { history, dispatch } = props;
      dispatch({
        type: 'fetch_userInfo',
        url: '/admin/user/get.do',
        location: history.location,
      });

      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
