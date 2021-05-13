import React, { Component } from "react";
import { Card, Button, List, Badge } from "antd";

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

export default class idnex extends Component {
  render() {
    return (
      <Card title={"通知中心"} extra={<Button>全部标记为已读</Button>}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={<Badge dot>{item.title}</Badge>} />
              <Button>标记为已读</Button>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}
