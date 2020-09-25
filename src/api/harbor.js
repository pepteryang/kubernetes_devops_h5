import request from "@/utils/request";

export function GetHarborList(params) {
  return request({
    url: "assets/assetsOtherResource/",
    method: "get",
    params
  });
}

export function getHarborProjectList(data) {
  return request({
    url: "api/harbor/listProject/",
    method: "post",
      data
  });
}

export function getHarborProjectDetail(data) {
  return request({
    url: "api/harbor/detailProject/",
    method: "post",
      data
  });
}

export function getHarborRepoInfo(data) {
  return request({
    url: "api/harbor/tagInfo/",
    method: "post",
      data
  });
}

export function delHarborRepoTag(data) {
  return request({
    url: "api/harbor/deleteTag/",
    method: "post",
      data
  });
}
