import { getNotifications } from "../request";
import {
  MARK_NOTIFICATIONS_BY_ID,
  MARK_NOTIFICATIONS_ALL,
  START_NOTIFICATIONS,
  END_NOTIFICATIONS,
  GET_NOTIFICATIONS_DATA,
} from "./actionTypes";
export const markNotificationsById = (id) => {
  return (dispatch) => {
    // 调用startNotifications, isLoading => true
    dispatch(startNotifications());
    setTimeout(() => {
      dispatch({
        type: MARK_NOTIFICATIONS_BY_ID,
        payload: {
          id,
        },
      });
      // 异步请求完毕数据后
      dispatch(endNotifications());
    }, 1000);
  };
};

export const markNotificationsAll = () => {
  return (dispatch) => {
    dispatch(startNotifications());
    setTimeout(() => {
      dispatch({ type: MARK_NOTIFICATIONS_ALL });
      dispatch(endNotifications());
    }, 1000);
  };
};

// 下面两个只需要在内部工作，不需要导出
const startNotifications = () => {
  return {
    type: START_NOTIFICATIONS,
  };
};
const endNotifications = () => {
  return {
    type: END_NOTIFICATIONS,
  };
};

// 异步请求获取通知中心数据
export const getNotificationsData = () => {
  return (dispatch) => {
    dispatch(startNotifications());
    getNotifications().then((res) => {
      console.log("res", res.list);
      dispatch({
        type: GET_NOTIFICATIONS_DATA,
        payload: {
          // 异步请求获取数据，然后把获取到的数据传递给reducer，进而更改redux
          list: res.list,
        },
      });
      dispatch(endNotifications());
    });
  };
};
