import Home from "../views/home/index.vue";
import Screen from "../views/screen/index.vue";
import Permission from "../views/acl/permission/index.vue";
import Role from "../views/acl/role/index.vue";
import User from "../views/acl/user/index.vue";
import Brand from "../views/product/brand/index.vue";
import Products from "../views/product/products/index.vue";
import ProductDetail from "../views/product/detail/index.vue";
export const layoutrouter = [
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { title: "主界面" },
  },
  {
    path: "/screen",
    name: "screen",
    component: Screen,
    meta: { title: "数据大屏 " },
  },
  {
    path: "/role",
    name: "role",
    component: Role,
    meta: { title: "权限管理" },
  },
  {
    path: "/permission",
    name: "permission",
    component: Permission,
    meta: { title: "菜单管理" },
  },
  {
    path: "/user",
    name: "user",
    component: User,
    meta: { title: "用户管理" },
  },
  {
    path: "/brand",
    name: "brand",
    component: Brand,
    meta: { title: "品牌管理" },
  },
  {
    path: "/products",
    name: "products",
    component: Products,
    meta: { title: "商品列表" },
  },
  {
    path: "/productdetail/:id?",
    name: "productdetail",
    component: ProductDetail,
    meta: { title: "商品详情" },
    props: true,
  },
];
