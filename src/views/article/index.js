import React, { Component } from "react";
import { Card, Button, Table, Tag, Tooltip, Modal, typography } from "antd";
import moment from "moment";
import XLSX from "xlsx";
import { getArticle, deleteArticleById } from "../../request";
const ButtonGroup = Button.Group;
const { Text } = typography;
const titleDisplayMap = {
  id: "id",
  title: "标题",
  amount: "阅读量",
  author: "作者",
  currentAt: "创建时间",
};
export default class index extends Component {
  state = {
    dataSource: [], // 定义初始化的数据源
    columns: [], // 定义初始化的列
    total: 0, // 总数
    loading: false, // 代表表格loading初始化家在状态
    limited: 10, // 代表每一页的数量
    offset: 0, // 当前页开始的条数  0-9第一页的数据  10-19 第二页的数据
    visible: false, // 模态窗口默认不显示
    deleteTitle: "", // 删除文章的title
    deleteLoading: false, // 删除文章确认的loading
    deleteId: "", // 删除文章的id
  };
  // 创建列的代码
  createColums = (columnsKey) => {
    const columns = columnsKey.map((item) => {
      // 如果是阅读量的话
      if (item === "amount") {
        return {
          title: titleDisplayMap[item], // 列的名字
          render: (record) => {
            const { amount } = record;
            // return amount>220?<Tag color="red">{amount}</Tag>:<Tag color="green">{amount}</Tag>;
            return (
              <Tooltip
                placement={amount > 220 ? "top" : "bottom"}
                title={amount > 220 ? "大于220" : "低于220"}
              >
                <Tag color={amount > 220 ? "green" : "red"}>{amount}</Tag>
              </Tooltip>
            );
          },
          key: item,
        };
      }
      // 如果是时间的话
      if (item === "currentAt") {
        return {
          title: titleDisplayMap[item], // 列的名字
          render: (record) => {
            let { currentAt } = record;
            return moment(currentAt).format("YYYY年MM月DD日 HH:MM:SS");
          },
          key: item,
        };
      }

      return {
        title: titleDisplayMap[item], // 列的名字
        dataIndex: item, // 这一列的数据需要显示name   使dataSource里面的数据与每一列相对应
        key: item,
      };
    });
    // 现在要往columns再去添加两列
    columns.push({
      title: "操作",
      key: "action",
      render: (record) => {
        return (
          <ButtonGroup>
            <Button
              onClick={this.toEdit.bind(this, record)}
              size="small"
              type="primary"
            >
              编辑
            </Button>
            <Button
              onClick={this.deleteArticle.bind(this, record)}
              size="small"
              type="danger"
            >
              删除
            </Button>
          </ButtonGroup>
        );
      },
    });
    return columns;
  };

  // 跳转到编辑页面
  toEdit = (record) => {
    // this.props.history.push(`/admin/article/edit/${id}`);
    this.props.history.push({
      pathname: `/admin/article/edit/${record.id}`,
      state: {
        title: record.title,
      },
    });
    localStorage.setItem("title", JSON.stringify(record));
  };

  // 删除文章
  deleteArticle = (record) => {
    // console.log(record);
    // Modal.info({ title: "我是删除按钮哦！" });
    // Modal.success({ title: "成功了！！", content: "你真是太棒了！！" });
    // Modal.error({ title: "ERROR ！！！", content: "需要找研发同学看一下哦！" });
    // Modal.confirm({
    //   title: "注意！此项要删除了！",
    //   // content: `确定要删除${record.title}文章吗？`,
    //   content: (
    //     <>
    //       确定要删除
    //       <Text style={{ color: "red" }} delete>
    //         {record.title}
    //       </Text>{" "}
    //       文章吗？
    //     </>
    //   ),
    //   onOk: () => {
    //     // console.log("======click OnOk");
    //     deleteArticleById(record.id).then((res) => {
    //       console.log(res); // 删除成功
    //     });
    //   },
    // });
    this.setState({
      visible: true,
      deleteTitle: record.title,
      deleteId: record.id,
    });
  };
  // 点击取消
  handleCancel = () => {
    this.setState({
      visible: false,
      deleteTitle: "",
    });
  };
  // 点击确定
  onOk = () => {
    this.setState({
      deleteLoading: true,
    });
    deleteArticleById(this.state.deleteId)
      .then((res) => {
        console.log(res);
        // 删除完毕是否停留在当前页还是跳转到首页
        this.setState(
          {
            offset: 0, // 回到首页
          },
          () => {
            this.getData(); // 获取数据
          }
        );
      })
      .finally(() => {
        this.setState({
          deleteLoading: false, // 隐藏loading
          visible: false, // 弹窗消失
        });
      });
  };

  // 发起请求数据
  getData = () => {
    // 发起ajax请求的时候需要加载loading
    this.setState({ loading: true });
    getArticle(this.state.limited, this.state.offset)
      .then((res) => {
        const columnsKey = Object.keys(res.list[0]); // ["id", "title", "author", "amount", "currentAt"]
        const columns = this.createColums(columnsKey); // 调用创建列的方法
        this.setState({
          total: res.total, // 设置分页的数量
          columns, // 设置列的数组
          dataSource: res.list, // 设置异步请求的回来的数据
        });
      })
      .finally(() => {
        this.setState({ loading: false }); // 加载完成loading消失
      });
  };
  componentDidMount() {
    this.getData();
  }
  // 点击每一页的时候触发       page:当前页码  pageSize: 当前页的条数
  handleChange = (page, pageSize) => {
    // console.log(page, pageSize);
    this.setState(
      {
        offset: pageSize,
        limited: pageSize * (page - 1),
      },
      () => {
        // 必须等到状态更改完成之后才能发起异步请求,获取最新的数据
        this.getData();
      }
    );
  };

  // 导出Excel
  toExcel = () => {
    // 真实的项目开发场景中。前端发送Ajax请求，后端传来一个文件地址，前端只需要点击下载·就可以实现了。
    const data = [Object.keys(this.state.dataSource[0])];
    for (var i = 0; i < this.state.dataSource.length; i++) {
      // data.push(Object.values(this.state.dataSource[i]));
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        // 单独处理时间戳
        moment(this.state.dataSource[i].currentAt).format(
          "YYYY年MM月DD日 HH:MM:SS"
        ),
      ]);
    }
    // console.log(data);
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(
      wb,
      `用户信息表-${this.state.offset / this.state.limited + 1}页.xlsx`
    );
  };

  render() {
    return (
      <Card
        title="文章列表"
        extra={<Button onClick={this.toExcel}>导出Excel表</Button>}
      >
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          rowKey={(record) => record.id}
          loading={this.state.loading}
          pagination={{
            current: this.state.offset / this.state.limited + 1,
            position: ["bottomright"], //  分页器的位置
            total: this.state.total, //  分页器的总页数
            // pageSize: 3, // 一页显示的条数
            hideOnSinglePage: true, // 只有一页的时候不需要显示分页器
            showQuickJumper: true, // 可以跳转到某一页
            pageSizeOptions: ["10", "15", "20", "25"], // 可以指定每页显示多少条数据
            onChange: this.handleChange, // 点击每一页时触发
          }}
        />
        <Modal
          title="注意！要删除了"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          confirmLoading={this.state.deleteLoading}
          onOk={this.onOk} // 点击OK时执行的函数
          cancelText="点错了，再看看！"
          okText="是的，我想好了"
          maskClosable={false} // 点击蒙层是否允许关闭
          // mask={false}  // 是否显示遮罩层
          // maskStyle={{ background: "#cecece" }}  // 遮罩的背景颜色
          width={360}
        >
          <>
            确定要删除
            <Text style={{ color: "red" }} delete>
              {this.state.deleteTitle}
            </Text>{" "}
            文章吗？
          </>
        </Modal>
      </Card>
    );
  }
}
