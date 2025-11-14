//登录发送的数据类型
export interface loginForm {
  username: string;
  password: string;
}

//登陆接受的数据类型
export interface userResponse {
  code: number;
  message?: string;
  data: {
    id: number;
    username: string;
    role: string;
    name: string;
    avatar: string;
    token: string;
  } | null;
}

export interface userData {
  id: number;
  username: string;
  role: string;
  name: string;
  avatar: string;
  token: string;
}

export interface UserItem {
  id: number;
  username: string;
  password: string;
  avatar: string;
}

export interface UserListResponse {
  code: number;
  message: string;
  data: UserItem[];
}

// 新增的管理员用户相关类型
export interface AdminUser {
  id: number;
  username: string;
  password: string;
  role: string;
  name: string;
  age: number;
  avatar: string;
  token: string;
}

export interface AdminUserListResponse {
  code: number;
  message: string;
  data: AdminUser[];
}

export interface AddAdminUserRequest {
  username: string;
  password: string;
  role: string;
  name: string;
  age: number;
  avatar: string;
}

export interface UpdateAdminUserRequest {
  username?: string;
  password?: string;
  role?: string;
  name?: string;
  age?: number;
  avatar?: string;
}

export interface AdminUserResponse {
  code: number;
  message: string;
  data: AdminUser | null;
}

export interface DeleteAdminUserResponse {
  code: number;
  message: string;
  data: {
    id: number;
    username: string;
  } | null;
}
