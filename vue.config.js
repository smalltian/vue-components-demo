

module.exports = {
  /*对node_modules下指定的第三方依赖进行polyfill转化*/
  transpileDependencies:[
  ],
  devServer:{
    hot: true
  },
  /*打包后是否产生map定位文件  生产环境不产生*/
  productionSourceMap: process.env.NODE_ENV === "development",
  /*打包后静态资源存放目录*/
  assetsDir: undefined,
  /*资源请求头部*/
  baseUrl: './',
  /*打包后输出目录*/
//   outputDir: process.env.NODE_ENV === "development" ? "./dist_dev" : "./dist",
  runtimeCompiler: undefined,
  parallel: undefined,
  css: undefined,
  /*webpack配置 https://webpack.js.org/concepts/*/
  configureWebpack: (config) => {
    /*新增自定义配置 会被webpackmerge合并 配置参照webpack官网*/
    const newConfig = {
      resolve: {
        alias: {//别称路径 类似于@
         
        }
      },
 
    }

    return newConfig
  }
}