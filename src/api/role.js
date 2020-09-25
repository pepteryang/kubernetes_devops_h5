import request from "@/utils/request";
// -------------------------------------------------------
//系统角色管理接口
//--------------------------------------------------------
export function GetRolesInfo(params) {
    return request({
        url: "account/systemRoleManager/",
        method: "get",
        params
    });
}

export function PostRolesInfo(data) {
    return request({
        url: "account/systemRoleManager/",
        method: "post",
        data
    });
}

export function PatchRolesInfo(data) {
    return request({
        url: "account/systemRoleManager/",
        method: "patch",
        data
    });
}

export function DeleteRolesInfo(data) {
    return request({
        url: "account/systemRoleManager/",
        method: "delete",
        data
    });
}



