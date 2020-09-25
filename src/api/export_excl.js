import request from "@/utils/request";

export function exportHostInfoData(data) {
  return request({
    url: "/assets/exportHostData/",
    responseType: "arraybuffer",
    method: "post",
    data
  });
}
