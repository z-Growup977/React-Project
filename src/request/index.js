//使用axios进行异步操作
import axios from "axios";
import { message } from "antd";
message.config({
  top: 200,
});
const service = axios.create({
  baseURL: "http://rap2api.taobao.org/app/mock/275994",
});

//axios的拦截器
//请求之前的拦截
service.interceptors.request.use((config) => {
  // console.log("request-config",config)
  //后续authToken值肯定需要从本地存储取出来，然后再去发给后端
  config.data = { ...config.data, authToken: "adjlsajdlaoeuasd" };
  return config;
});

//响应之后的拦截
service.interceptors.response.use((res) => {
  // console.log("response-res", res);
  if (res.data.code === 200) {
    return res.data.data;
  } else {
    message.error("ERROR!!");
  }
});

//请求文章列表数据
export const getArticle = (offset, limited) => {
  return service.post("/api/v1/articleList", { offset, limited });
};

// 删除文章根据ID
export const deleteArticleById = (id) => {
  return service.post(`/api/v1/articleDelete/${id}`);
};

// 根据id查询编辑文章的详细信息
export const getArticleDetailById = (id) => {
  return service.post(`/api/v1/article/${id}`);
};

// 根据id与对应的入参进行文章的保存
export const saveArticleById = (id, data) => {
  return service.post(`/api/v1/articlesave/${id}`, data);
};
