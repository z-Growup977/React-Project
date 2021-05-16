import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Badge } from "antd";
import Logo from "./Logo.png";
import "./index.less";
import { admainRoute } from "../../routes/index";
import { withRouter } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

// 过滤一下,生成新的数组
const menu = admainRoute.filter((route) => route.isNav === true); // [{dashbord}, {article}, {settings}]
const { Header, Content, Footer, Sider } = Layout;

const mapState = (state) => {
  return {
    notificationsCount: state.notifications.list.filter(
      (item) => item.hasRead === false
    ).length,
  };
};

@connect(mapState)
@withRouter
class index extends Component {
  // 当我们点击Menu.item的时候会触发  路由相关的API history location match
  handleMenu = ({ key }) => {
    this.props.history.push(key);
  };
  handleMenuClick = ({ key }) => {
    // console.log(key);
    this.props.history.push(key);
  };

  // 成员方法
  menu = () => (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="/admin/notifications">
        <Badge dot={this.props.notificationsCount} offset={[18, 6]}>
          通知中心
        </Badge>
      </Menu.Item>
      <Menu.Item key="/admin/settings">个人设置</Menu.Item>
      <Menu.Item key="/login">退出</Menu.Item>
    </Menu>
  );
  render() {
    let selectedKeysArr = this.props.location.pathname.split("/");
    selectedKeysArr.length = 3; // 就算点击编辑页面的时候也只会保留地址的/admin/article
    // console.log(selectedKeysArr);
    return (
      <Layout>
        <Header className="header zj-header">
          <div className="logo">
            <img src={Logo} title="Logo" alt="Logo" />
          </div>
          <Dropdown trigger={["click"]} overlay={this.menu()}>
            <div
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <Badge count={this.props.notificationsCount} offset={[2, 5]}>
                <Avatar
                  style={{ position: "relative", top: -2 }}
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F1294a4d68303b98af00011f89f249a99c771bd18.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623382966&t=d68320067a3a1eeae239f33544d46174"
                />

                <span>欢迎您：小佩奇</span>
                <DownOutlined />
              </Badge>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={menu[0].pathname} // 初始化（默认）选中的菜单项 key是数组
                selectedKeys={[selectedKeysArr.join("/")]} // 当前选中的菜单项 key是数组
                style={{ height: "100%" }}
                onClick={this.handleMenu}
              >
                {menu.map((route) => {
                  return (
                    <Menu.Item key={route.pathname}>
                      {route.icon}
                      {route.title}
                    </Menu.Item>
                  );
                })}
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              {/* 相当于插槽 */}
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>@antd 2012</Footer>
      </Layout>
    );
  }
}
export default index;
