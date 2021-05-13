import ReactDOM from "react-dom";
import App from "./App";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { mainRoute } from "./routes";
import "./index.less";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <Switch>
        <Route path="/admin" component={App} />
        {mainRoute.map((route, index) => {
          return (
            <Route
              path={route.pathname}
              key={index}
              component={route.component}
            />
          );
        })}
        <Redirect to="/admin" from="/" exact />
        <Redirect to="/404" />
      </Switch>
    </Router>
  </ConfigProvider>,
  document.getElementById("root")
);
