import React, { Component } from "react";
import { Card, Button, List, Badge, Spin } from "antd";
import { connect } from "react-redux";
import {
  markNotificationsById,
  markNotificationsAll,
} from "../../actions/notifications";

const mapState = (state) => {
  return {
    list: state.notifications.list,
    isLoading: state.notifications.isLoading,
  };
};

@connect(mapState, { markNotificationsById, markNotificationsAll })
class index extends Component {
  render() {
    console.log(this.props);
    return (
      <Spin spinning={this.props.isLoading}>
        <Card
          title={"通知中心"}
          extra={
            <Button
              disabled={this.props.list.every((item) => item.hasRead === true)}
              onClick={this.props.markNotificationsAll}
            >
              全部标记为已读
            </Button>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={this.props.list}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                  description={item.desc}
                />
                {item.hasRead ? (
                  ""
                ) : (
                  <Button
                    onClick={this.props.markNotificationsById.bind(
                      this,
                      item.id
                    )}
                  >
                    标记为已读
                  </Button>
                )}
              </List.Item>
            )}
          />
        </Card>
      </Spin>
    );
  }
}

export default index;
