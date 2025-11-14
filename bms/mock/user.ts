import { type MockMethod } from "vite-plugin-mock";

// 权限列表
const roleList = ["admin", "editor"];

// 用户数据样例
let mockUsers = [
  {
    id: 1,
    username: "admin",
    password: "111111",
    role: "admin",
    name: "ZEROandLIFE",
    age: 30,
    avatar:
      "https://ts3.tc.mm.bing.net/th/id/OIP-C.ggsZdTRvkxgQHIv-pbJU0AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    token: "admin-token-123456",
  },
  {
    id: 2,
    username: "ZEROandLIFE",
    password: "111111",
    role: "editor",
    name: "张三",
    age: 25,
    avatar:
      "https://ts3.tc.mm.bing.net/th/id/OIP-C.6WS2KSgxdGD_QoMiARkyQAHaGb?rs=1&pid=ImgDetMain&o=7&rm=3",
    token: "editor-token-789012",
  },
  {
    id: 3,
    username: "guest",
    password: "111111",
    role: "editor",
    name: "李四",
    age: 20,
    avatar:
      "https://ts3.tc.mm.bing.net/th/id/OIP-C.cQlLJHdf4YoKcqxA6hfxwQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    token: "guest-token-345678",
  },
];


const userList = [
  {
    id: 1,
    username: "user001",
    password: "111111",
    avatar:
      "https://www.keaitupian.cn/cjpic/frombd/2/253/148571187/2302473532.jpg",
  },
  {
    id: 2,
    username: "user002",
    password: "111111",
    avatar: "https://img.keaitupian.cn/newupload/12/1672052251881978.jpg",
  },
  {
    id: 3,
    username: "user003",
    password: "111111",
    avatar:
      "https://www.keaitupian.cn/cjpic/frombd/2/253/3810755577/3802575188.jpg",
  },
  {
    id: 4,
    username: "user004",
    password: "111111",
    avatar:
      "https://www.keaitupian.cn/cjpic/frombd/0/253/4289762115/814556258.jpg",
  },
  {
    id: 5,
    username: "user005",
    password: "111111",
    avatar:
      "https://ts3.tc.mm.bing.net/th/id/OIP-C.5d6b914f7c4b3a6e0e1e1f1a1b1c1d1e?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 6,
    username: "user006",
    password: "111111",
    avatar:
      "https://ts3.tc.mm.bing.net/th/id/OIP-C.32946559_232404090105_2?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 7,
    username: "user007",
    password: "111111",
    avatar:
      "https://ts3.tc.mm.bing.net/th/id/OIP-C.9069dde9dd1665cfe29c9d283d32903a?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 8,
    username: "user008",
    password: "111111",
    avatar:
      "https://ts3.tc.mm.bing.net/th/id/OIP-C.l32-48?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 9,
    username: "user009",
    password: "111111",
    avatar:
      "https://ts3.tc.mm.bing.net/th/id/OIP-C.hc-applelogo?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 10,
    username: "user010",
    password: "111111",
    avatar:
      "https://ts3.tc.mm.bing.net/th/id/OIP-C.ggsZdTRvkxgQHIv-pbJU0AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 11,
    username: "user011",
    password: "111111",
    avatar:
      "https://ts3.tc.mm.bing.net/th/id/OIP-C.6WS2KSgxdGD_QoMiARkyQAHaGb?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 12,
    username: "user012",
    password: "111111",
    avatar:
      "https://ts3.tc.mm.bing.net/th/id/OIP-C.cQlLJHdf4YoKcqxA6hfxwQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

// 获取所有管理员用户
function getAdminUsersApiMock(): MockMethod {
  return {
    url: "/api/user/adminUsers",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "获取管理员列表成功",
        data: mockUsers,
      };
    },
  };
}

// 添加管理员用户
function addAdminUserApiMock(): MockMethod {
  return {
    url: "/api/user/adminUsers",
    method: "post",
    response: (request: {
      body: {
        username: string;
        password: string;
        role: string;
        name: string;
        age: number;
        avatar: string;
      };
    }) => {
      const { username, password, role, name, age, avatar } = request.body;

      // 检查用户名是否已存在
      const existingUser = mockUsers.find((u) => u.username === username);
      if (existingUser) {
        return {
          code: 400,
          message: "用户名已存在",
          data: null,
        };
      }

      // 验证权限是否有效
      if (!roleList.includes(role)) {
        return {
          code: 400,
          message: "无效的权限类型",
          data: null,
        };
      }

      // 创建新用户
      const newUser = {
        id: Math.max(...mockUsers.map((u) => u.id)) + 1,
        username,
        password,
        role,
        name,
        age,
        avatar,
        token: `${role}-token-${Date.now()}`,
      };

      mockUsers.push(newUser);

      return {
        code: 200,
        message: "添加管理员成功",
        data: {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
          name: newUser.name,
          avatar: newUser.avatar,
        },
      };
    },
  };
}

// 更新管理员用户
function updateAdminUserApiMock(): MockMethod {
  return {
    url: "/api/user/adminUsers/:id",
    method: "put",
    response: (request: {
      body: {
        username?: string;
        password?: string;
        role?: string;
        name?: string;
        age?: number;
        avatar?: string;
      };
      query: { id: string };
    }) => {
      const id = parseInt(request.query.id);
      const updateData = request.body;

      // 查找用户
      const userIndex = mockUsers.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        return {
          code: 404,
          message: "用户不存在",
          data: null,
        };
      }

      // 检查用户名是否被其他用户使用
      if (updateData.username) {
        const existingUser = mockUsers.find(
          (u) => u.username === updateData.username && u.id !== id
        );
        if (existingUser) {
          return {
            code: 400,
            message: "用户名已被其他用户使用",
            data: null,
          };
        }
      }

      // 验证权限是否有效
      if (updateData.role && !roleList.includes(updateData.role)) {
        return {
          code: 400,
          message: "无效的权限类型",
          data: null,
        };
      }

      // 更新用户信息
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...updateData,
      };

      return {
        code: 200,
        message: "更新管理员信息成功",
        data: {
          id: mockUsers[userIndex].id,
          username: mockUsers[userIndex].username,
          role: mockUsers[userIndex].role,
          name: mockUsers[userIndex].name,
          avatar: mockUsers[userIndex].avatar,
          age: mockUsers[userIndex].age,
        },
      };
    },
  };
}

// 删除管理员用户
function deleteAdminUserApiMock(): MockMethod {
  return {
    url: "/api/user/adminUsers/:id",
    method: "delete",
    response: (request: { query: { id: string } }) => {
      const id = parseInt(request.query.id);

      // 查找用户
      const userIndex = mockUsers.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        return {
          code: 404,
          message: "用户不存在",
          data: null,
        };
      }

      // 防止删除最后一个管理员
      const adminUsers = mockUsers.filter((u) => u.role === "admin");
      if (mockUsers[userIndex].role === "admin" && adminUsers.length === 1) {
        return {
          code: 400,
          message: "不能删除最后一个管理员用户",
          data: null,
        };
      }

      // 删除用户
      const deletedUser = mockUsers.splice(userIndex, 1)[0];

      return {
        code: 200,
        message: "删除管理员成功",
        data: {
          id: deletedUser.id,
          username: deletedUser.username,
        },
      };
    },
  };
}

// 登录接口
function createLoginApiMock(): MockMethod {
  return {
    url: "/api/user/login",
    method: "post",
    response: (request: { body: { username: string; password: string } }) => {
      const { username, password } = request.body;
      // 查找匹配的用户
      const user = mockUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // 登录成功，返回用户信息和token（实际项目中不要返回密码）
        return {
          code: 200,
          message: "登录成功",
          data: {
            id: user.id,
            username: user.username,
            role: user.role,
            name: user.name,
            avatar: user.avatar,
            token: user.token,
          },
        };
      } else {
        // 登录失败
        return {
          code: 401,
          message: "用户名或密码错误",
          data: null,
        };
      }
    },
  };
}

// 用户信息接口（示例）
function createUserInfoApiMock(): MockMethod {
  return {
    url: "/api/user/info",
    method: "get",
    response: (request: { headers: { token: string } }) => {
      const token = request.headers?.token;
      const user = mockUsers.find((u) => u.token === token);

      if (user) {
        return {
          code: 200,
          message: "获取用户信息成功",
          data: {
            id: user.id,
            username: user.username,
            role: user.role,
            name: user.name,
            avatar: user.avatar,
            age: user.age,
          },
        };
      } else {
        return {
          code: 401,
          message: "未授权，请先登录",
          data: null,
        };
      }
    },
  };
}

function getUserListApiMock(): MockMethod {
  return {
    url: "/api/user/list",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "获取用户名单成功",
        data: userList,
      };
    },
  };
}

// 获取权限列表
function getRoleListApiMock(): MockMethod {
  return {
    url: "/api/user/roles",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "获取权限列表成功",
        data: roleList,
      };
    },
  };
}

// 修改用户角色
function updateUserRoleApiMock(): MockMethod {
  return {
    url: "/api/user/updateRole",
    method: "put",
    response: (request: { body: { id: number; role: string } }) => {
      const { id, role } = request.body;

      // 验证权限是否有效
      if (!roleList.includes(role)) {
        return {
          code: 400,
          message: "无效的权限类型",
          data: null,
        };
      }

      // 查找用户
      const userIndex = mockUsers.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        return {
          code: 404,
          message: "用户不存在",
          data: null,
        };
      }

      // 更新用户角色
      mockUsers[userIndex].role = role;

      return {
        code: 200,
        message: "用户权限更新成功",
        data: {
          id: mockUsers[userIndex].id,
          username: mockUsers[userIndex].username,
          role: mockUsers[userIndex].role,
          name: mockUsers[userIndex].name,
          avatar: mockUsers[userIndex].avatar,
        },
      };
    },
  };
}

// 导出所有Mock接口
export default [
  createLoginApiMock(),
  createUserInfoApiMock(),
  updateUserRoleApiMock(),
  getRoleListApiMock(),
  getUserListApiMock(),
  getAdminUsersApiMock(),
  addAdminUserApiMock(),
  updateAdminUserApiMock(),
  deleteAdminUserApiMock(),
] as MockMethod[];
