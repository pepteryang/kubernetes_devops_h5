import request from "@/utils/request";

//获取Kubernetes集群中namespaces列表
export function GetKubernetesNamespaces(data) {
    return request({
        url: "api/kubernetes/getKubernetesNamespaces/",
        method: "post",
        data
    });
}
//获取Namespace下面的全部Pods
export function GetPodsInKubernetesNamespaces(data) {
    return request({
        url: "api/kubernetes/getPodsInKubernetesNamespaces/",
        method: "post",
        data
    });
}

//获取集群下面的全部Pods
export function GetPodsForAllNamespaces(data) {
    return request({
        url: "api/kubernetes/getPodsForAllNamespaces/",
        method: "post",
        data
    });
}

//删除集群里的pod
export function DeleteNamespacePod(data) {
  return request({
      url: "api/kubernetes/deleteNamespacePod/",
      method: "post",
      data
  });
}


