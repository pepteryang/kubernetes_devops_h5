import request from "@/utils/request";

// -------------------------------------------------------
//系统按钮管理接口
//--------------------------------------------------------

export function GetSystemMenuInfo(params) {
  return request({
    url: "account/systemMenuManager/",
    method: "get",
    params
  });
}

export function PostSystemMenuInfo(data) {
  return request({
    url: "account/systemMenuManager/",
    method: "post",
    data
  });
}

export function PatchSystemMenuInfo(data) {
  return request({
    url: "account/systemMenuManager/",
    method: "patch",
    data
  });
}

export function DeleteSystemMenuInfo(data) {
  return request({
    url: "account/systemMenuManager/",
    method: "delete",
    data
  });
}

// -------------------------------------------------------
//系统按钮管理接口
//--------------------------------------------------------
export function TreeSystemMenuList(params) {
    return request({
        url: "account/treeSystemMenuList/",
        method: "get",
        params
    });
}