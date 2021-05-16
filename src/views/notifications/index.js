import React, { Component } from "react";
import { Card, Button, List, Badge } from "antd";
import { connect } from "react-redux";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const mapState = (state) => {
  return { list: state.notifications.list };
};

@connect(mapState)
class index extends Component {
  render() {
    console.log(this.props);
    return (
      <Card
        title={"通知中心"}
        extra={
          <Button
            disabled={this.props.list.every((item) => item.hasRead === true)}
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
                <Button>标记为未读</Button>
              ) : (
                <Button>标记为已读</Button>
              )}
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default index;
