<template>
  <div class="outer">
    <el-card class="transparent-card" :class="cardThemeClass">
      <!-- 头部 -->
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
        </div>
      </template>
      <!-- 表格部分 -->
      <el-table
        :data="currentPageData"
        :border="true"
        style="margin: 10px 0; flex: 1"
        empty-text="暂无数据"
        v-loading="loading"
      >
        <!-- 序号 -->
        <el-table-column
          label="序号"
          width="120px"
          header-align="center"
          align="center"
        >
          <template #default="{ $index }">
            {{ (currentPage - 1) * pageSize + $index + 1 }}
          </template>
        </el-table-column>
        <!-- 用户ID -->
        <el-table-column
          label="用户ID"
          align="center"
          prop="id"
          width="100"
        ></el-table-column>
        <!-- 用户名 -->
        <el-table-column
          label="用户名"
          align="center"
          prop="username"
        ></el-table-column>
        <!-- 密码 -->
        <el-table-column
          label="密码"
          align="center"
          prop="password"
        ></el-table-column>
        <!-- 头像 -->
        <el-table-column label="头像" align="center">
          <template #default="{ row }">
            <el-image 
              style="width: 80px; height: 80px; border-radius: 50%" 
              :src="row.avatar" 
              fit="cover"
            />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[4]"
          :background="true"
          layout="total, prev, pager, next, jumper"
          :total="userList.length"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="UserList">
  import { useUserStore } from "../../../store/modules/user.ts";
  import { computed, ref, onMounted } from "vue";
  import { getUserList } from "../../../api/user/index"; // 假设有这个API

  const userStore = useUserStore();
  let currentPage = ref(1);
  let pageSize = ref(4); // 每页显示4条数据
  const userList = ref<any[]>([]); // 存储用户数据
  const loading = ref(false);

  // 计算当前页显示的数据
  const currentPageData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return userList.value.slice(start, end);
  });

  // 主题切换
  const cardThemeClass = computed(() => {
    return userStore.theme === "dark" ? "card-dark" : "card-light";
  });

  // 获取用户列表
  const fetchUserList = async () => {
    try {
      loading.value = true;
      // 这里调用API获取用户列表
      const res = await getUserList();
      if (res.code === 200) {
        userList.value = res.data;
      }
    } catch (error) {
      console.error("获取用户列表失败:", error);
    } finally {
      loading.value = false;
    }
  };

  // 当前页改变
  const handleCurrentChange = (val: number) => {
    currentPage.value = val;
  };

  onMounted(() => {
    fetchUserList();
  });
</script>

<style scoped lang="scss">
  .outer {
    height: 100%;
    width: 100%;
    padding: 5px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid black;
      padding: 5px;
      span {
        font-size: 30px;
      }
    }
  }

  .transparent-card {
    border: none !important;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    :deep(.el-card__header) {
      border-bottom: none !important;
    }

    :deep(.el-card__body) {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    :deep(.el-table) {
      .el-table__row {
        height: 100px;
      }
    }
  }

  .demo-pagination-block {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding: 10px 0;
  }

  /* 深色主题样式 */
  .card-dark {
    color: yellow;

    :deep(.el-card__header) {
      background-color: rgba(0, 0, 0, 0.3) !important;
      color: yellow;
    }

    :deep(.el-card__body) {
      background-color: rgba(0, 0, 0, 0.3) !important;
      color: yellow;
    }

    /* 深色主题下的分页器样式 */
    :deep(.el-pagination) {
      .btn-prev,
      .btn-next,
      .number,
      .more {
        color: yellow;
        background-color: rgba(0, 0, 0, 0.5);

        &:hover {
          color: #fff;
        }

        &.is-active {
          background-color: #409eff;
          color: #fff;
        }
      }
    }
  }

  /* 浅色主题样式 */
  .card-light {
    color: #000;

    :deep(.el-card__header) {
      background-color: rgba(255, 255, 255, 0.3) !important;
      color: #000;
    }

    :deep(.el-card__body) {
      background-color: rgba(255, 255, 255, 0.3) !important;
      color: #000;
    }
  }
</style>