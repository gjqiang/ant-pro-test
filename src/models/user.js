export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
