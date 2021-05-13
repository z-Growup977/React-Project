import React, { Component, createRef } from "react";
import echarts from "echarts";

import { Card } from "antd";

const option = {
  title: {
    text: "ECharts 入门示例",
  },
  tooltip: {},
  legend: {
    data: ["销量", "销量2"],
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
    {
      name: "销量2",
      type: "pie",
      data: [5, 25, 46, 30, 40, 88],
    },
  ],
};
export default class index extends Component {
  constructor() {
    super();
    this.articleAmount = createRef();
  }

  componentDidMount() {
    // console.log(this.articleAmount.current);
    this.articleEcharts = echarts.init(this.articleAmount.current);
    this.articleEcharts.setOption(option);
  }
  render() {
    return (
      <Card>
        <div style={{ width: 600, height: 400 }} ref={this.articleAmount}></div>
      </Card>
    );
  }
}
