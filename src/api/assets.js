import request from "@/utils/request";

//IDC 接口
export function GetIDCInfo(params) {
    return request({
        url: "assets/assetsIDCInfo/",
        method: "get",
        params
    });
}

export function PostIDCInfo(data) {
    return request({
        url: "assets/assetsIDCInfo/",
        method: "post",
        data
    });
}

export function PatchIDCInfo(data) {
    return request({
        url: "assets/assetsIDCInfo/",
        method: "patch",
        data
    });
}

export function DeleteIDCInfo(data) {
    return request({
        url: "assets/assetsIDCInfo/",
        method: "delete",
        data
    });
}

//ENV 接口
export function GetEnvInfo(params) {
    return request({
        url: "assets/assetsEnvInfo/",
        method: "get",
        params
    });
}

export function PostEnvInfo(data) {
    return request({
        url: "assets/assetsEnvInfo/",
        method: "post",
        data
    });
}

export function PatchEnvInfo(data) {
    return request({
        url: "assets/assetsEnvInfo/",
        method: "patch",
        data
    });
}

export function DeleteEnvInfo(data) {
    return request({
        url: "assets/assetsEnvInfo/",
        method: "delete",
        data
    });
}

//服务器主机接口
export function GetHostInfo(params) {
    return request({
        url: "assets/assetsHostInfo/",
        method: "get",
        params
    });
}

export function PostHostInfo(data) {
    return request({
        url: "assets/assetsHostInfo/",
        method: "post",
        data
    });
}

export function PatchHostInfo(data) {
    return request({
        url: "assets/assetsHostInfo/",
        method: "patch",
        data
    });
}

export function DeleteHostInfo(data) {
    return request({
        url: "assets/assetsHostInfo/",
        method: "delete",
        data
    });
}

export function UpdateHostInfoForAnsbile(data) {
    return request({
        url: "assets/updateHostForAnsible/",
        method: "post",
        data
    });
}

//项目接口
export function GetProjectInfo(params) {
    return request({
        url: "assets/assetsProjectInfo/",
        method: "get",
        params
    });
}

export function PostProjectInfo(data) {
    return request({
        url: "assets/assetsProjectInfo/",
        method: "post",
        data
    });
}

export function PatchProjectInfo(data) {
    return request({
        url: "assets/assetsProjectInfo/",
        method: "patch",
        data
    });
}

export function DeleteProjectInfo(data) {
    return request({
        url: "assets/assetsProjectInfo/",
        method: "delete",
        data
    });
}

//主机修改记录
export function getHostRecordInfo(params) {
    return request({
        url: "assets/assetsHostRecordInfo/",
        method: "get",
        params
    });
}

//数据库管理接口
export function GetDatabaseInfo(params) {
    return request({
        url: "assets/assetsDatabaseInfo/",
        method: "get",
        params
    });
}

export function PostDatabaseInfo(data) {
    return request({
        url: "assets/assetsDatabaseInfo/",
        method: "post",
        data
    });
}

export function PatchDatabaseInfo(data) {
    return request({
        url: "assets/assetsDatabaseInfo/",
        method: "patch",
        data
    });
}

export function DeleteDatabaseInfo(data) {
    return request({
        url: "assets/assetsDatabaseInfo/",
        method: "delete",
        data
    });
}

// 导出模块
export function exportHostInfoData(data) {
    return request({
        url: "/assets/exportHostData/",
        responseType: "blob",
        method: "post",
        data
    });
}

// 其他资源管理接口
export function GetOtherResource(params) {
    return request({
        url: "/assets/assetsOtherResource/",
        method: "get",
        params
    })
}

export function PostOtherResource(data) {
    return request({
        url: "/assets/assetsOtherResource/",
        method: "post",
        data
    })
}

export function PatchOtherResource(data) {
    return request({
        url: "/assets/assetsOtherResource/",
        method: "patch",
        data
    })
}

export function DeleteOtherResource(data) {
    return request({
        url: "/assets/assetsOtherResource/",
        method: "Delete",
        data
    })
}

// 项目模块管理接口
export function GetProjectModuleInfo(params) {
    return request({
        url: "/assets/assetsProjectModuleInfo/",
        method: "get",
        params
    })
}

export function PostProjectModuleInfo(data) {
    return request({
        url: "/assets/assetsProjectModuleInfo/",
        method: "post",
        data
    })
}

export function PatchProjectModuleInfo(data) {
    return request({
        url: "/assets/assetsProjectModuleInfo/",
        method: "patch",
        data
    })
}

export function DeleteProjectModuleInfo(data) {
    return request({
        url: "/assets/assetsProjectModuleInfo/",
        method: "Delete",
        data
    })
}

