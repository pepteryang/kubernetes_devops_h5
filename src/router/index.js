import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import { getToken } from "@/utils/auth"; // get token from cookie

Vue.use(Router);

export const constantRoutes = [
    {
        path: "/login",
        component: () => import("@/views/login/"),
        hidden: true
    },
    {
        path: "/",
        redirect: "/dashboard",
        component: () => import("@/views/sidebar/Home"),
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/'),
            meta: { title: 'Dashboard', icon: 'dashboard' }
            }, {
                path: "/DataRoom",
                component: () => import("@/views/assets/IDC/"),
                meta: {
                    title: "机房管理"
                }
            }, {
                path: "/ServerManager",
                component: () => import("@/views/assets/hosts/"),
                meta: {
                    title: "服务器管理"
                }
            }, {
                path: "/EnvManager",
                component: () => import("@/views/assets/environment/"),
                meta: {
                    title: "部署环境管理"
                }
            },{
                path: "/ProjectsManager",
                component: () => import("@/views/assets/projects/"),
                meta: {
                    title: "项目管理"
                }
            },{
            path: "/ProjectsModuleManager",
            component: () => import("@/views/assets/projectModule/"),
            meta: {
                title: "项目模块管理"
            }
            },{
                path: "/databaseManager",
                component: () => import("@/views/assets/databases/"),
                meta: {
                    title: "数据库信息管理"
                }
            },{
                path: "/otherResourceManager",
                component: () => import("@/views/assets/resources/"),
                meta: {
                    title: "其他资源管理"
                }
            },{
            path:"/systemUserManager",
            component:()=> import("@/views/system/account/"),
            meta:{
                title:"系统用户管理"
            }
        },{
            path:"/systemRolesManager",
            component:()=> import("@/views/system/roles/"),
            meta:{
                title:"系统角色管理"
            }
        },{
            path:"/systemMenuManager",
            component:()=> import("@/views/system/menu/"),
            meta:{
                title:"导航栏管理"
            }
        },{
            path:"/HarborManager",
            component:()=> import("@/views/harbor/"),
            meta:{
                title:"Harbor管理"
            }
        },{
            path:"/JenkinsManager",
            component:()=> import("@/views/jenkins/"),
            meta:{
                title:"Jenkins管理"
            }
        },{
            path:"/categories",
            component:()=> import("@/views/kubernetes/resource/categories/"),
            meta:{
                title:"K8S资源类型"
            }
        },{
            path:"/resourcePool",
            component:()=> import("@/views/kubernetes/resource/resourcePool/"),
            meta:{
                title:"K8S资源池"
            }
        },{
            path:"/deployment",
            component:()=> import("@/views/kubernetes/deployment/deploy/"),
            meta:{
                title:"Deploy资源"
            }
        },{
            path:"/deployInfo",
            component:()=> import("@/views/kubernetes/deployment/deployInfo/"),
            meta:{
                title:"Deploy详情"
            }
        },{
          path:"/BaseService",
          component:()=> import("@/views/kubernetes/deployment/deployInfo/"),
          meta:{
              title:"常规平台管理"
          }
      }
        
        ]
    },
];

export const asyncRoutes = [
    {
        path: "/",
        redirect: "/dashboard",
        component: () => import("@/views/sidebar/Home"),
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/'),
            meta: { title: 'Dashboard', icon: 'dashboard' }
        }]
    },
]
const createRouter = () =>
    new Router({
        mode: "history", // require service support
        scrollBehavior: () => ({y: 0}),
        routes: constantRoutes
    });

const router = createRouter();

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // determine whether the user has logged in
    const hasToken = getToken();
    if (hasToken) {
        if (to.path === "/login" ) {
            // if is logged in, redirect to the home page
            next({path: "/"});
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next();
            } else {
                try {
                    // get user info
                    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                    //动态获取路由表的信息
                    const { roles } = await store.dispatch('user/getInfo');
                    
                    // generate accessible routes map based on roles
                    //动态添加路由表
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
                    console.log(accessRoutes)
                    // dynamically add accessible routes
                    router.addRoutes(accessRoutes);
                    
                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({ ...to, replace: true });
                }catch (error) {
                    localStorage.removeItem("token")
                    await store.dispatch("user/resetToken");
                    next(`/login?redirect=${to.path}`);
                    // 否则全部重定向到登录页
                }
            }
        }
    } else {
        /* has no token*/
        
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next();
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`);
        }
    }
});
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    Router.matcher = newRouter.matcher; // reset router
}

export default router;
