import { asyncRoutes, constantRoutes } from "@/router";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 * 如果有权限判断，需要在路由之前判断路由的权限
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 这个函数的主要作用就是把后台传过来的字符串型的component转化为真正的组件
 * @param file
 */

function _import(file) {
    return () => import('@/views' + file)
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 * 动态路由方法2：通过路由匹配，动态生成路由，一般用在移动端，保证路由的稳定性，
 * 本程序暂时没有使用
 */
export function filterAsyncRoutes(routes, roles) {
    let asyncRouterMap,filterAsyncRouter;//防止报错。没有启用的
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}


/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 * @param data
 */
export function generaMenuRoutes(routes, data) {
    data.forEach(item => {
        // alert(JSON.stringify(item))
        const menu = {
            //后续在修改
            path: "/" + item.path,
            component:null,
            // hidden: item.hidden,
            children: [],
            // redirect:item.redirect,
            name: item.label,
            meta: {title: item.label, icon: item.icon, id: item.id}
        };
        if (item.children) {
            generaMenuRoutes(menu.children, item.children);
        }
        routes.push(menu);
    
    });
    return routes;
}

const state = {
    routes: constantRoutes,
    addRoutes: []
};

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes;
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({commit}, data) {
        return new Promise(resolve => {
            generaMenuRoutes(asyncRoutes[0]["children"], data);
            let accessedRoutes;
            //这里其实没有用到，保留，方便后续扩展
            if (data.includes('admin')) {
                accessedRoutes = asyncRoutes || []
            } else {
                //用到的只有这一条
                accessedRoutes = asyncRoutes;
            }
            commit('SET_ROUTES', accessedRoutes);
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
