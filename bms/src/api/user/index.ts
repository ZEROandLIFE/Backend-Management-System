import request from "../../utils/request";
const apis = {
  LOGIN_URL: "/user/login",
  USERINFO_URL: "/user/info",
};
//登录接口方法
export const reqLogin = (data: any) => request.post(apis.LOGIN_URL, data);
//获取用户信息接口方法
export const regUserInfo = () => request.get(apis.USERINFO_URL);
