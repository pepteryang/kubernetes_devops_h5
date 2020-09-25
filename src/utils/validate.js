/**
 * 数据验证样本
 * vvalidator: validateUsername
 */
const validateUsername = (rule, value, callback) => {
  let reg = /^[a-zA-Z0-9_-]{4,16}$/;
  if (!reg.test(value)) {
    callback(new Error("请输入4-16位的英文、数字、下划线"));
  } else {
    callback();
  }
};

const validateName = (rule, value, callback) => {
  let reg = /^[\u4e00-\u9fa5\w]{1,6}$/;
  if (!reg.test(value)) {
    callback(new Error("请输入1-6位的汉字、英文、数字、下划线"));
  } else {
    callback();
  }
};

//自定义验证规则
const validatePass = (rule, value, callback) => {
  // 6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格
  let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
  if (!reg.test(value)) {
    callback(new Error("密码长度需6-16位，且包含字母和字符"));
  } else {
    callback();
  }
};

const validatePhone = (rule, value, callback) => {
  let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
  if (!reg.test(value)) {
    callback(new Error("手机号码不正确，请重新填写"));
  } else {
    callback();
  }
};
const validateEmail = (rule, value, callback) => {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (!reg.test(value)) {
    callback(new Error("邮箱格式不正确"));
  } else {
    callback();
  }
};
export default {
  validateUsername,
  validatePass,
  validateEmail,
  validatePhone,
  validateName
};
