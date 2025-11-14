import request from "../../utils/request";
import {
  type loginForm,
  type userResponse,
  type UserListResponse,
  type AdminUserListResponse,
  type AddAdminUserRequest,
  type UpdateAdminUserRequest,
  type AdminUserResponse,
  type DeleteAdminUserResponse,
} from "./type";

const apis = {
  LOGIN_URL: "/user/login",
  USERINFO_URL: "/user/info",
  GET_USER_LIST: "/user/list",
  GET_ADMIN_USERS: "/user/adminUsers",
  ADD_ADMIN_USER: "/user/adminUsers",
  UPDATE_ADMIN_USER: "/user/adminUsers",
  DELETE_ADMIN_USER: "/user/adminUsers",
};

// 登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, userResponse>(apis.LOGIN_URL, data);

// 获取用户信息接口方法
export const reqUserInfo = () =>
  request.get<any, userResponse>(apis.USERINFO_URL);

// 获取普通用户列表
export const getUserList = () => {
  return request.get<any, UserListResponse>(apis.GET_USER_LIST);
};

// 获取所有管理员用户
export const getAdminUsers = () => {
  return request.get<any, AdminUserListResponse>(apis.GET_ADMIN_USERS);
};

// 添加管理员用户
export const addAdminUser = (data: AddAdminUserRequest) => {
  return request.post<any, AdminUserResponse>(apis.ADD_ADMIN_USER, data);
};

// 更新管理员用户
export const updateAdminUser = (id: number, data: UpdateAdminUserRequest) => {
  return request.put<any, AdminUserResponse>(
    `${apis.UPDATE_ADMIN_USER}/${id}`,
    data
  );
};

// 删除管理员用户
export const deleteAdminUser = (id: number) => {
  return request.delete<any, DeleteAdminUserResponse>(
    `${apis.DELETE_ADMIN_USER}/${id}`
  );
};
