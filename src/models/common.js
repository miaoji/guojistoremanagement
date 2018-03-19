export const pageModel = {
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
