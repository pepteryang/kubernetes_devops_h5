import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "xterm/css/xterm.css"
/*
 * https://element.eleme.cn/#/zh-CN/component/quickstart
 */
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/reset.css";
import "./plugins/element.js";

// set ElementUI lang to EN
Vue.component("ElementUI", ElementUI);

//定义全局变量

Vue.config.productionTip = false;
/*
 *打印当前环境信息
 */
console.log(process.env.BASE_URL);

//注册全局钩子用来拦截导航
// router.beforeEach((to, from, next) => {
//     //获取store里面的token
//     if (to.path.startsWith('/login')) {
//         let token = store.state.token;
//     //判断要去的路由有没有requiresAuth
//     if(to.meta.requiredAuth){
//         if(token){
//             next();
//         }else{
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath },  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
//                 (to.fullPath)
//             });
//         }
//     }else{
//         next();//如果无需token,那么随它去吧
//     }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
