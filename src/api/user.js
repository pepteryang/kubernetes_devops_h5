import request from "@/utils/request";

// -------------------------------------------------------
//用户登录注销和权限获取接口
//--------------------------------------------------------
export function userLogin(data) {
    return request({
        url: "account/login/",
        method: "post",
        data
    });
}

//注销接口，采用的的方式是刷新token 使用的token失效，如果为了安全，可以设置token的黑名单，
export function logout(data) {
    return request({
        url: "account/logout/",
        method: "post",
        data
    });
}

export function getInfo(token) {
    return request({
        url: "account/userRolesInfo/",
        method: "post",
        data: {token}
    });
}

// -------------------------------------------------------
//系统用户管理接口
// -------------------------------------------------------
export function GetUserInfo(params) {
    return request({
        url: "account/systemUserManager/",
        method: "get",
        params
    });
}

export function PostUserInfo(data) {
    return request({
        url: "account/systemUserManager/",
        method: "post",
        data
    });
}

export function PatchUserInfo(data) {
    return request({
        url: "account/systemUserManager/",
        method: "patch",
        data
    });
}

//用户管理接口
export function DeleteUserInfo(data) {
    return request({
        url: "account/systemUserManager/",
        method: "delete",
        data
    });
}

//刷新现有token
export function refreshToken(data) {
    return request({
        url: "account/logout/",
        method: "post",
        data
    });
}
