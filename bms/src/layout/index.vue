<template>
  <div class="layout-container" :class="currentTheme">
    <!-- 头部菜单 -->
    <header class="header">
      <div class="header-content">
        <h2>番茄管理系统</h2>
        <div class="header-actions">
          <el-button @click="toggleFullScreen">
            <el-icon><FullScreen /></el-icon>
            {{ isFullscreen ? "退出全屏" : "全屏" }}
          </el-button>
          <el-button @click="toggleCollapse">
            <el-icon><Switch /></el-icon>
            {{ isCollapsed ? "展开菜单" : "折叠菜单" }}
          </el-button>
          <el-button @click="toggleTheme">
            <el-icon><Refresh /></el-icon>
            切换主题
          </el-button>

          <!-- 用户下拉菜单 -->
          <el-dropdown @command="handleCommand" class="user-dropdown">
            <span class="user-info">
              <img :src="userData?.avatar" alt="头像" class="user-avatar" />
              <span class="username">{{ userData?.username }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>

    <div class="main-content">
      <!-- 左侧菜单 -->
      <aside class="sidebar" :style="{ width: sidebarWidth }">
        <el-menu
          class="sidebar-menu"
          :default-active="$route.path"
          :class="currentTheme"
          :collapse="isCollapsed"
          router
        >
          <el-menu-item index="/home">
            <el-icon><House /></el-icon>
            <template #title>首页</template>
          </el-menu-item>
          <el-menu-item index="/screen">
            <el-icon><Monitor /></el-icon>
            <template #title>数据大屏</template>
          </el-menu-item>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Lock /></el-icon>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/user">
              <el-icon><User /></el-icon>
              <template #title>用户管理</template>
            </el-menu-item>
            <el-menu-item index="/role">
              <el-icon><Avatar /></el-icon>
              <template #title>权限管理</template>
            </el-menu-item>
            <el-menu-item index="/permission">
              <el-icon><Document /></el-icon>
              <template #title>菜单管理</template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><SuitcaseLine /></el-icon>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/product/list">商品列表</el-menu-item>
            <el-menu-item index="/product/category">商品分类</el-menu-item>
            <el-menu-item index="/brand"
              ><el-icon><Goods /></el-icon>品牌管理</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </aside>

      <!-- 右侧内容区域 -->
      <main class="content-area">
        <div class="content">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import { useRoute } from "vue-router";

  import {
    House,
    Monitor,
    Lock,
    User,
    Avatar,
    Document,
    Refresh,
    SuitcaseLine,
    Switch,
    FullScreen,
    ArrowDown,
    SwitchButton,
    Goods,
  } from "@element-plus/icons-vue";
  import { useUserStore } from "../store/modules/user";
  import { useRouter } from "vue-router";
  import { ElButton } from "element-plus";
  const userStore = useUserStore();
  const $route = useRoute();

  // 菜单折叠状态
  const isCollapsed = ref(false);
  const sidebarWidth = computed(() => (isCollapsed.value ? "64px" : "250px"));

  // 全屏状态
  const isFullscreen = ref(false);

  // 切换菜单折叠
  const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  // 切换全屏
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      // 进入全屏
      const docEl = document.documentElement as any;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen();
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    } else {
      // 退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  // 监听全屏状态变化
  const handleFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement;
  };

  // 切换背景
  const isDark = ref(false);
  const initTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      isDark.value = false;
    } else if (savedTheme === "dark") {
      isDark.value = true;
    }
  };

  onMounted(() => {
    initTheme();
    // 添加全屏事件监听
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
  });

  onUnmounted(() => {
    // 移除事件监听
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
    document.removeEventListener(
      "webkitfullscreenchange",
      handleFullscreenChange
    );
    document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
    document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
  });

  const currentTheme = computed(() => (isDark.value ? "dark" : "light"));
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    userStore.theme = isDark.value ? "dark" : "light";
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  let useStore = useUserStore();
  const router = useRouter();

  // 处理下拉菜单命令
  const handleCommand = (command: string) => {
    if (command === "logout") {
      useStore.quit();
    }
  };

  const userData = useStore.userData;
</script>

<style scoped lang="scss">
  @use "../styles/index.scss" as *;

  .layout-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
  }

  .header {
    height: 60px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: all 0.3s ease;

    .header-content {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      h2 {
        margin: 0;
        font-size: 26px;
      }

      .header-actions {
        display: flex;
        gap: 10px;
        align-items: center;
      }
    }
  }

  /* 用户下拉菜单样式 */
  .user-dropdown {
    cursor: pointer;

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      // border-radius: 4px;
      transition: background-color 0.3s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }

    .user-avatar {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    .username {
      font-size: 14px;
      font-weight: 500;
    }
  }

  .main-content {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .sidebar-menu {
    flex: 1;
    border-right: none;
    transition: all 0.3s ease;
  }

  .content-area {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    transition: all 0.3s ease;

    .content {
      padding: 20px;
      margin: auto;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      height: 90%;
      width: 95%;
    }
  }

  :deep(.el-sub-menu__title) {
    font-size: 16px !important;
  }

  /* 折叠状态下的菜单项文字隐藏 */
  :deep(.el-menu--collapse .el-sub-menu__title span),
  :deep(.el-menu--collapse .el-menu-item span) {
    display: none;
  }

  /* 深色主题样式 */
  .layout-container.dark {
    .header {
      background-color: #{$head-dark};
      color: white;
    }

    .user-dropdown {
      .user-info:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .username {
        color: #{$active-text-color-dark};
      }
    }

    .sidebar {
      background-color: #{$left-background-dark};
    }

    .content-area {
      background-color: #{$content-area-background-color-dark};

      .content {
        background: #{$content-background-dark};
        color: #{$content-color-dark};
      }
    }

    :deep(.sidebar-menu.dark) {
      --el-menu-active-color: #{$active-text-color-dark};
      --el-menu-bg-color: #{$left-background-dark};
      --el-menu-text-color: #{$text-color-dark};
      --el-menu-hover-bg-color: #{$active-left-background-dark};
    }
  }

  /* 浅色主题样式 */
  .layout-container.light {
    .header {
      background-color: #{$head-light};
      color: #{$text-color-light};
      border-bottom: 1px solid #e4e7ed;
    }

    .sidebar {
      background-color: #{$left-background-light};
      border-right: 1px solid #e4e7ed;
    }

    .content-area {
      background-color: #{$content-area-background-color-light};

      .content {
        background: #{$content-background-light};
        color: #{$content-color-light};
      }
    }

    :deep(.sidebar-menu.light) {
      --el-menu-active-color: #{$active-text-color-light};
      --el-menu-bg-color: #{$left-background-light};
      --el-menu-text-color: #{$text-color-light};
      --el-menu-hover-bg-color: #{$active-left-background-light};
    }
  }

  /* 淡入淡出 */
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
  }

  .fade-enter-from {
    opacity: 0;
  }
  .fade-leave-to {
    opacity: 0;
  }
</style>
