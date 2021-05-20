// reducer必须是一个纯函数， 固定的输入必须要有固定的输出，内部不能有不纯的操作  new Date Math.radom()
// 内部不能有IO操作，异步操作
// 千万不能更改之前的状态

import {
  MARK_NOTIFICATIONS_BY_ID,
  MARK_NOTIFICATIONS_ALL,
  START_NOTIFICATIONS,
  END_NOTIFICATIONS,
  GET_NOTIFICATIONS_DATA,
} from "../actions/actionTypes";

const initState = {
  isLoading: false, // 用来控制loading的状态
  list: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case START_NOTIFICATIONS:
      return {
        ...state,
        isLoading: true,
      };
    case END_NOTIFICATIONS:
      return {
        ...state,
        isLoading: false,
      };
    case GET_NOTIFICATIONS_DATA:
      return {
        ...state,
        list: action.payload.list,
      };
    case MARK_NOTIFICATIONS_BY_ID:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === action.payload.id) {
            item.hasRead = !item.hasRead;
          }
          return item;
        }),
      };
    case MARK_NOTIFICATIONS_ALL:
      return {
        ...state,
        list: state.list.map((item) => {
          item.hasRead = true;
          return item;
        }),
      };

    default:
      return state;
  }
};

export default reducer;
