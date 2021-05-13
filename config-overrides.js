const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
} = require("customize-cra");

const modifyVars = require("./theme"); // 全局主题文件

module.exports = override(
  addDecoratorsLegacy(), // 装饰器的配置
  //  按需引入的配置
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  //  自定义主题的配置
  addLessLoader({
    javascriptEnabled: true,
    modifyVars,
  })
);
