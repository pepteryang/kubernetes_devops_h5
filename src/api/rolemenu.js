import request from "@/utils/request";

export function PostRoleMenuInfo(data) {
    //新建角色和按钮导航条绑定接口
    return request({
        url: "account/systemRoleMenuManager/",
        method: "post",
        data
    });
}

export function PatchRolesMenuInfo(data) {
    //更新角色和按钮导航条绑定接口
    return request({
        url: "account/systemRoleMenuManager/",
        method: "patch",
        data
    });
}

export function GetRoleMenuInfo(params) {
    //获取角色绑定按钮的接口
    return request({
        url: "account/systemRoleMenuManager/",
        method: "get",
        params
    });
}
