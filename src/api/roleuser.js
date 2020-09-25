import request from "@/utils/request";

// -------------------------------------------------------
//系统角色和用户管理接口
//--------------------------------------------------------

export function GetRoleUserInfo(params) {
    return request({
        url: "account/systemRoleUserManager/",
        method: "get",
        params
    });
}

//保存角色和用户关系的接口
export function PostRoleUserInfo(data) {
    return request({
        url: "account/systemRoleUserManager/",
        method: "post",
        data
    });
}

//更新角色中的用户
export function PatchRoleUserInfo(data) {
    return request({
        url: "account/systemRoleUserManager/",
        method: "patch",
        data
    });
}
