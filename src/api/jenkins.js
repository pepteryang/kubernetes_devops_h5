import request from "@/utils/request";


export function GetJenkinsList(params) {
    return request({
        url: "assets/assetsOtherResource/",
        method: "get",
        params
    });
}

export function GetJenkinsAllJobsList(data) {
    return request({
        url: "api/jenkins/getJenkinsAllJobs/",
        method: "post",
        data
    });
}

export function GetJenkinsAllViews(data) {
    return request({
        url: "api/jenkins/getJenkinsAllViews/",
        method: "post",
        data
    });
}

export function GetJenkinsJobInfo(data) {
    return request({
        url: "api/jenkins/getJenkinsJobInfo/",
        method: "post",
        data
    });
}

export function GetJenkinsBuildJob(data) {
    return request({
        url: "api/jenkins/getJenkinsBuildJob/",
        method: "post",
        data
    });
}

export function GetJenkinsBuildInfo(data) {
    return request({
        url: "api/jenkins/getJenkinsBuildInfo/",
        method: "post",
        data
    });
}

export function GetJenkinsBuildConsoleOutput(data) {
    return request({
        url: "api/jenkins/getJenkinsBuildConsoleOutput/",
        method: "post",
        data
    });
}


