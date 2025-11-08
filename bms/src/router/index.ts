import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "../views/404/index.vue";
import Login from "../views/login/index.vue";
import { useUserStore } from "../store/modules/user";
import Layout from "../layout/index.vue";
import { layoutrouter } from "./layoutrouter";
import { ElNotification, ElMessage } from "element-plus";
import nprogress from "nprogress";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      meta: { title: "" },
      children: layoutrouter,
      redirect:'/home'
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { title: "登录界面" },
    },
    {
      path: "/404",
      name: "notfound",
      component: NotFound,
      meta: { title: "404NotFound" },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: { title: "404NotFound" },
    },
  ],
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});
router.beforeEach((to, from, next) => {
  nprogress.start()
  const userStore = useUserStore();
  const isAuthenticated = userStore.check();
  if (isAuthenticated && to.path === "/login") {
    ElMessage({
      type: "success",
      message: "已登录，无需重复登录",
    });
    next("/");
    return;
  }
   if (!isAuthenticated && to.path !== "/login") {
     ElNotification({
       type: "error",
       message: "还没有登录，请先登录",
     });
     next("/login");
     return;
   }
 next()
});
router.afterEach((from: any, to: any) => {
nprogress.done();
});
export default router;
