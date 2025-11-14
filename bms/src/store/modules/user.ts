import { defineStore } from "pinia";
import { ref } from "vue";
import { reqLogin, reqUserInfo } from "../../api/user/index";
import { useRouter } from "vue-router";
import {
  type loginForm,
  type userResponse,
  type userData,
} from "../../api/user/type";
import { ElMessage, ElNotification, ElMessageBox } from "element-plus";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const token = ref<string | null>(localStorage.getItem("token"));
  const theme = ref<string>(localStorage.getItem("theme") || "light");
  const userData = ref<userData | null>(
    // 初始化时尝试从 localStorage 读取 userData
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")!)
      : null
  );

  const login = async (form: loginForm) => {
    const res: userResponse = await reqLogin(form);
    if (res.code === 200 && res.data) {
      // 存储 token 和 userData
      token.value = res.data.token;
      userData.value = res.data;

      // 存入 localStorage
      localStorage.setItem("token", token.value);
      localStorage.setItem("userData", JSON.stringify(userData.value));

      return "登录成功";
    } else {
      return Promise.reject(new Error(res.message));
    }
  };

  const quit = async () => {
    try {
      await ElMessageBox.confirm("确定要退出登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });

      // 清空 localStorage 和状态
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      token.value = null;
      userData.value = null;
      router.push("/login");
      ElMessage({
        type: "success",
        message: "退出登录成功",
      });

    } catch (error) {
      ElMessage({
        type: "info",
        message: "已取消退出",
      });
    }
  };

  const check = () => {
    if (token.value === null) return false;
    else return true;
  };

  return { token, userData, login, check, quit ,theme};
});
