import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "../views/404/index.vue";
import Login from "../views/login/index.vue";
import Home from "../views/home/index.vue";
import Layout from "../layout/index.vue"
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      meta: { title: "" },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { title: "登录界面" },
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { title: "主界面" },
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
export default router;
