import React, { Component, createRef } from "react";
import { Form, Input, Button, Card, DatePicker, message, Spin } from "antd";
import E from "wangeditor";
import { getArticleDetailById, saveArticleById } from "../../request/index";
import "./index.less";
import moment from "moment";

// const layout = {
//   labelCol: {span: 3},  // label标签的宽度
//   wrapperCol: {span: 6}, // 表单的宽度
// };
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 12,
  },
};
export default class Edit extends Component {
  constructor() {
    super();
    this.state = { isLoading: false };
    this.contentRef = createRef();
    this.formRef = createRef();
  }
  // 初始化富文本编辑器
  initEditor = () => {
    this.editor = new E(this.contentRef.current);
    // console.log(editor);

    // 这个方法是当表单提交的时候，发现content字段没有进行设置，所以需要江富文本编辑器里的内容取出来，然后在再把表单字段content进行设置。
    this.editor.config.onchange = (html) => {
      // html 即变化之后的内容
      // 获取到了富文本编辑器里的内容了，就可以将其对于content字段进行设置了
      this.formRef.current.setFieldsValue({
        content: html,
      });
    };
    this.editor.create();
  };
  componentDidMount() {
    if (!this.props.location.state && !localStorage.getItem("title")) {
      this.props.history.push("/admin/article");
    }
    // 初始化的时候需要将isLoading变成true
    this.setState({
      isLoading: true,
    });
    // 初始化富文本编辑器
    this.initEditor();

    // 异步请求文章详情
    getArticleDetailById(this.props.match.params.id)
      .then((res) => {
        res.currentAt = moment(res.currentAt); //  等同于下边的注释
        this.formRef.current.setFieldsValue(res);
        // this.formRef.current.setFieldsValue({
        //   title: res.title,
        //   amount: res.amount,
        //   author: res.author,
        //   currentAt: moment(res.currentAt),
        // });
        this.editor.txt.html(res.content);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }
  // 成功时走的通道
  onFinish = (values) => {
    // 点击提交的时候需要将isLoading变成true
    this.setState({
      isLoading: true,
    });
    // 需要注意：values中的currentAt字段是moment对象，所以现在需要将moment对象转成时间戳传给后端。
    // console.log("Success:", values.currentAt.valueOf());
    values.currentAt = values.currentAt.valueOf();
    // 保存文章的接口，传入id和values
    saveArticleById(this.props.match.params.id, values)
      .then((res) => {
        // console.log(res.message);
        // 保存成功时的弹窗
        message.success(res.message);
      })
      .finally(() => {
        this.setState({ isLoading: false });
        // 成功之后跳转路径到文章列表
        this.props.history.push("/admin/article");
      });
  };
  // 失败时走的通道
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //
  //
  // 渲染render
  render() {
    // console.log(this.props);
    const state =
      this.props.location.state || JSON.parse(localStorage.getItem("title"));
    return (
      <div>
        <Card
          title={state && state.title}
          extra={
            <Button onClick={() => this.props.history.goBack()}>返回</Button>
          }
        >
          <Spin spinning={this.state.isLoading}>
            <Form
              ref={this.formRef}
              {...layout}
              name="basic"
              initialValues={{
                // remember: false, //   记住的fg
                title: state.title,
                password: 123,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              colon={false}
              // labelAlign={"left"} // 对其方式 默认right
              onValuesChange={(changedValues, allValues) => {
                // 字段值更新时触发回调事件
                // console.log(changedValues, allValues);
              }}
            >
              {/* 标题组件 */}
              <Form.Item
                label="文章标题"
                name="title"
                rules={[{ required: true, message: "请输入文章标题!" }]}
                // {min: 3,},
                // {max: 10,},
                // {pattern: /\d/,},
                // 自定义校验，传入一个函数⤵️
                // ({ getFieldValue }) => {
                //   // console.log("getFieldValue", getFieldValue("title"));
                //   if (getFieldValue("title") === "Hello World") {
                //     return Promise.resolve();
                //   }
                //   return Promise.reject("title输入不合法...");
                // },
              >
                {/* autoFocus 自动聚焦到当前输入框 */}
                <Input autoFocus />
              </Form.Item>
              {/* 阅读量 */}
              <Form.Item
                label="阅读量"
                name="amount"
                rules={[{ required: true, message: "请输入文章阅读量！" }]}
              >
                <Input />
              </Form.Item>

              {/* 作者 */}
              <Form.Item
                label="作者"
                name="author"
                rules={[{ required: true, message: "请输入文章作者！" }]}
              >
                <Input />
              </Form.Item>

              {/* 发布时间 */}
              <Form.Item
                label="发布时间"
                name="currentAt"
                rules={[{ required: true, message: "请输入文章发布时间!" }]}
              >
                <DatePicker showTime />
              </Form.Item>

              {/* 文章内容 */}
              <Form.Item
                label="文章内容"
                name="content"
                rules={[{ required: true, message: "请输入文章内容！" }]}
              >
                <div className="zj-editor" ref={this.contentRef}></div>
              </Form.Item>

              {/* 提交组件 */}
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}
