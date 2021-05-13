import React, { Component, Fragment } from "react";
import { admainRoute } from "./routes";
import { Redirect, Route, Switch } from "react-router-dom";
// 引入布局frame
import Frame from "./components/frame";

export default class App extends Component {
  render() {
    return (
      <>
        <Frame>
          <Switch>
            {admainRoute.map((route, index) => {
              return (
                <Route
                  path={route.pathname}
                  key={index}
                  component={route.component}
                  exact
                />
              );
            })}
            <Redirect to={admainRoute[0].pathname} from="/admin" exact />
            <Redirect to="/404" />
          </Switch>
        </Frame>
      </>
    );
  }
}
