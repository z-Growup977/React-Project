import {
  Article,
  ArticleEdit,
  Dashboard,
  Login,
  Notfound,
  Notifications,
  Settings,
} from "../views";

// 使用antd里面的icon图标
import {
  DashboardOutlined,
  OrderedListOutlined,
  SettingOutlined,
} from "@ant-design/icons";

// 需要实现一个效果？
//  /admin/xxx  dashboard article articleEdit settingsc

// /login   /404
export const mainRoute = [
  {
    pathname: "/login",
    component: Login,
  },
  {
    pathname: "/404",
    component: Notfound,
  },
];

//  /admin/xxx  dashboard article articleEdit settings
export const admainRoute = [
  {
    pathname: "/admin/dashborad",
    component: Dashboard,
    title: "仪表盘",
    isNav: true,
    icon: <DashboardOutlined />,
  },
  {
    pathname: "/admin/article",
    component: Article,
    title: "文章列表",
    isNav: true,
    icon: <OrderedListOutlined />,
  },
  // 编辑页面
  {
    pathname: "/admin/article/edit/:id",
    component: ArticleEdit,
  },
  {
    pathname: "/admin/settings",
    component: Settings,
    title: "设置",
    isNav: true,
    icon: <SettingOutlined />,
  },
  {
    pathname: "/admin/notifications",
    component: Notifications,
  },
];
