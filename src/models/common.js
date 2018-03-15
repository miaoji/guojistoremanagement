export const pageModel = {
  state: {
    modalVisible: false,
    data: {
      list: [],
      pagination: {},
    },
    currentItem: {},
    modalType: 'create',
  },
  reducers: {
    setStates(state, { payload }) {
      return { ...state, ...payload };
    },
    querySuccess(state, { payload }) {
      const { list, pagination } = payload;
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      };
    },
  },
};
