import request from "@/utils/request";



//获取Kubernetes中资源类型列表
export function GetResourcesCategoriesInfo(params) {
    return request({
        url: "api/kubernetes/resourcesCategoriesInfo/",
        method: "get",
        params
    });
}

//创建Kubernetes中资源类型列表
export function PostResourcesCategoriesInfo(data) {
    return request({
        url: "api/kubernetes/resourcesCategoriesInfo/",
        method: "post",
        data
    });
}

//更新Kubernetes中资源类型列表
export function PatchResourcesCategoriesInfo(data) {
    return request({
        url: "api/kubernetes/resourcesCategoriesInfo/",
        method: "patch",
        data
    });
}

//删除Kubernetes中资源类型列表
export function DeleteResourcesCategoriesInfo(data) {
    return request({
        url: "api/kubernetes/resourcesCategoriesInfo/",
        method: "delete",
        data
    });
}

/*------------------------------------------------------------------------*/
//获取Kubernetes资源列表
export function GetResourcesInfo(params) {
    return request({
        url: "api/kubernetes/kubernetesResources/",
        method: "get",
        params
    });
}

//创建Kubernetes资源列表
export function PostResourcesInfo(data) {
    return request({
        url: "api/kubernetes/kubernetesResources/",
        method: "post",
        data
    });
}

//更新Kubernetes资源列表
export function PatchResourcesInfo(data) {
    return request({
        url: "api/kubernetes/kubernetesResources/",
        method: "patch",
        data
    });
}

//删除Kubernetes资源列表
export function DeleteResourcesInfo(data) {
    return request({
        url: "api/kubernetes/kubernetesResources/",
        method: "delete",
        data
    });
}


//获取kubernetes列表
export function GetKubernetesList(params) {
  return request({
    url: "/assets/assetsOtherResource/",
    method: "get",
    params
  });
}
//kubernetes部署服务接口
export function DeployKubernetesServices(data) {
    return request({
        url: "api/kubernetes/DeployKubernetesServices/",
        method: "post",
        data
    });
}

//创建Kubernetes中的项目列表
export function PostKubernetesProjectList(data) {
  return request({
    url: "/api/k8s/KubernetesProjectList/",
    method: "post",
    data
  });
}

//更新Kubernetes中的项目列表
export function PatchKubernetesProjectList(data) {
  return request({
    url: "/api/k8s/KubernetesProjectList/",
    method: "patch",
    data
  });
}



//获取Kubernetes中资源类型列表
export function GetKubernetesComponentList(params) {
  return request({
    url: "api/k8s/KubernetesComponentList/",
    method: "get",
    params
  });
}

//创建Kubernetes中资源类型列表
export function PostKubernetesComponentList(data) {
  return request({
    url: "/api/k8s/KubernetesComponentList/",
    method: "post",
    data
  });
}

//更新Kubernetes中资源类型列表
export function PatchKubernetesComponentList(data) {
  return request({
    url: "/api/k8s/KubernetesComponentList/",
    method: "patch",
    data
  });
}

export function GetKubernetesProjectToComponentList(params) {
  return request({
    url: "/api/k8s/KubernetesComponentList/",
    method: "get",
    params
  });
}

export function GetSystemServicesList(params) {
  return request({
    url: "/api/k8s/ListSystemServices/",
    method: "get",
    params
  });
}

export function GetDeploySystemServicesList(data) {
  return request({
    url: "/api/k8s/listDeploySystemServices/",
    method: "post",
    data
  });
}

//修改除系统服务外的服务配置
export function PostListApplicationServices(data) {
  return request({
    url: "/api/k8s/ListApplicationServices/",
    method: "post",
    data
  });
}

//获取系统服务外的服务配置
export function GetListApplicationServices(params) {
  return request({
    url: "/api/k8s/ListApplicationServices/",
    method: "get",
    params
  });
}

//更新非Kubernetes系统类型服务
export function PatchListApplicationServices(data) {
  return request({
    url: "/api/k8s/ListApplicationServices/",
    method: "patch",
    data
  });
}

//搜索非kubernetes服务用
export function SearchApplicationServicesInfo(data) {
  return request({
    url: "/api/k8s/searchApplicationServicesInfo/",
    method: "post",
    data
  });
}

export function GetActiveServicesList(params) {
  return request({
    url: "/api/k8s/patchServicesInfo/",
    method: "get",
    params
  });
}

export function GetDeployImagesList(params) {
  return request({
    url: "/api/k8s/deployImagesList/",
    method: "get",
    params
  });
}

export function DeploymentServiceInfo(data) {
  return request({
    url: "/api/k8s/ListSystemServices/",
    method: "post",
    data
  });
}

export function OtherServicesInfo(params) {
  return request({
    url: "/api/k8s/otherServicesInfo/",
    method: "get",
    params
  });
}

export function PostSystemServicesInfo(data) {
  return request({
    url: "/api/k8s/systemServicesList/",
    method: "post",
    data
  });
}

export function GetSystemServicesInfo(params) {
  return request({
    url: "/api/k8s/ListSystemServices/",
    method: "get",
    params
  });
}

export function PatchSystemServicesInfo(data) {
  return request({
    url: "/api/k8s/ListSystemServices/",
    method: "patch",
    data
  });
}

export function SearchSystemServicesInfo(params) {
  return request({
    url: "/api/k8s/searchApplicationServicesInfo/",
    method: "get",
    params
  });
}


