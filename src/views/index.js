// 这个文件的作用是把 views下的文件暴露出去

import Loadable from "react-loadable"; // 路由懒加载
import Loading from "../components/loading";

// 需要将对外的普通组件进行懒加载之后再暴露出去
const Article = Loadable({
  loader: () => import("./article"),
  loading: Loading,
});
const Dashboard = Loadable({
  loader: () => import("./dashboard"),
  loading: Loading,
});
const ArticleEdit = Loadable({
  loader: () => import("./article/Edit"),
  loading: Loading,
});
const Login = Loadable({
  loader: () => import("./login"),
  loading: Loading,
});
const Notfound = Loadable({
  loader: () => import("./notfound"),
  loading: Loading,
});
const Settings = Loadable({
  loader: () => import("./settings"),
  loading: Loading,
});
const Notifications = Loadable({
  loader: () => import("./notifications"),
  loading: Loading,
});

export {
  Article,
  ArticleEdit,
  Dashboard,
  Login,
  Notfound,
  Settings,
  Notifications,
};
