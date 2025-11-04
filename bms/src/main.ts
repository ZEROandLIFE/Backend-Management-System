import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import zhCn from "element-plus/es/locale/lang/zh-cn";
import components from './components'
import './styles/index.scss'
const app = createApp(App);

//用来获取当前环境
// console.log(import.meta.env);
app.use(components);
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app");