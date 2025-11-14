<template>
  <div class="outer">
    <el-card class="transparent-card" :class="cardThemeClass">
      <!-- 头部 -->
      <template #header>
        <div class="card-header">
          <span>管理员管理</span>
          <div class="header-actions">
            <el-button
              :type="userStore.theme === 'dark' ? 'info' : 'primary'"
              size="default"
              @click="refreshData"
            >
              <el-icon><Refresh /></el-icon> 刷新
            </el-button>
            <el-button
              :type="userStore.theme === 'dark' ? 'info' : 'primary'"
              size="default"
              @click="handleAdd"
            >
              <el-icon><Plus /></el-icon> 添加管理员
            </el-button>
          </div>
        </div>
      </template>
      <!-- 表格部分 -->
      <el-table
        :data="currentPageData"
        :border="true"
        style="margin: 10px 0; flex: 1 width:100%;"
        empty-text="暂无数据"
        v-loading="loading"
        :row-style="{ height: '80px' }"
      >
        <!-- 序号 -->
        <el-table-column
          label="序号"
          width="80px"
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
          width="150"
        ></el-table-column>
        <!-- 角色 -->
        <el-table-column
          label="角色"
          align="center"
          prop="role"
          width="120"
        >
          <template #default="{ row }">
            <el-tag 
              :type="row.role === 'admin' ? 'danger' : 'primary'"
              effect="dark"
            >
              {{ row.role === 'admin' ? '管理员' : '编辑者' }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 姓名 -->
        <el-table-column
          label="姓名"
          align="center"
          prop="name"
         
        ></el-table-column>
        <!-- 年龄 -->
        <el-table-column
          label="年龄"
          align="center"
          prop="age"
    
        ></el-table-column>
        <!-- 头像 -->
        <el-table-column label="头像" align="center" width="120">
          <template #default="{ row }">
            <el-image 
              style="width: 50px; height: 50px; border-radius: 50%" 
              :src="row.avatar" 
              :preview-src-list="[row.avatar]"
              fit="cover"
              preview-teleported
            >
              <template #error>
                <div class="image-slot">
                  <el-icon><User /></el-icon>
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center"  fixed="right">
          <template #default="{ row }">
            <el-button 
              type="primary" 
              size="small" 
              @click="handleEdit(row)"
            >
              <el-icon><Edit /></el-icon>编辑
            </el-button>
            <el-button 
              type="danger" 
              size="small" 
              @click="handleDelete(row)"
              :disabled="row.role === 'admin' && isLastAdmin"
            >
              <el-icon><Delete /></el-icon>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[4, 8, 12, 20]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataList.length"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </el-card>

    <!-- 添加/编辑对话框 -->
    <el-dialog 
      :title="dialogTitle" 
      v-model="dialogFormVisible" 
      width="500px"
      :close-on-click-modal="false"
      @close="cancelSubmit"
    >
      <el-form
        :model="newFormData"
        ref="formRef"
        :rules="formRules"
        label-width="80px"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="newFormData.username"
            :disabled="operationType === 2"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="newFormData.password"
            show-password
          />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="newFormData.role" placeholder="请选择角色" style="width: 100%">
            <el-option label="管理员" value="admin" />
            <el-option label="编辑者" value="editor" />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            placeholder="请输入姓名"
            v-model="newFormData.name"
          />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number
            v-model="newFormData.age"
            :min="1"
            :max="100"
            controls-position="right"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleImageChange"
            accept="image/*"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
          <div class="upload-tip">点击上传头像，支持 JPG、PNG 格式，大小不超过 2MB</div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelSubmit">取消</el-button>
        <el-button type="primary" @click="confirmSubmit" :loading="submitLoading">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Management">
  import { useUserStore } from "../../../store/modules/user.ts";
  import { computed, ref, onMounted, reactive } from "vue";
  import { Plus, Delete, Edit, Refresh, User } from "@element-plus/icons-vue";
import type { UploadProps, FormInstance, FormRules } from "element-plus";
  import {useRouter } from 'vue-router'
  import { ElMessage, ElMessageBox } from "element-plus";
  import { 
    getAdminUsers, 
    addAdminUser, 
    updateAdminUser, 
    deleteAdminUser 
  } from "../../../api/user/index.ts";
  const router=useRouter()
  const userStore = useUserStore();
  let currentPage = ref(1);
  let pageSize = ref(8);
  const dataList = ref<any[]>([]);
  const loading = ref(false);
  const submitLoading = ref(false);
  let dialogFormVisible = ref(false);
  let dialogTitle = ref("添加管理员");
  let imageUrl = ref("");
  const formRef = ref<FormInstance>();

  // 操作类型：1-新增，2-编辑
  let operationType = ref(1);
  let editingId = ref<number | null>(null);

  let newFormData = reactive({
    username: "",
    password: "",
    role: "",
    name: "",
    age: 0,
    avatar: "",
  });

  // 表单验证规则
  const formRules: FormRules = {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 20, message: "用户名长度在 3 到 20 个字符", trigger: "blur" }
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" }
    ],
    role: [
      { required: true, message: "请选择角色", trigger: "change" }
    ],
    name: [
      { required: true, message: "请输入姓名", trigger: "blur" },
      { min: 2, max: 20, message: "姓名长度在 2 到 20 个字符", trigger: "blur" }
    ],
    age: [
      { required: true, message: "请输入年龄", trigger: "blur" },
      { type: 'number', min: 1, max: 100, message: "年龄必须在 1 到 100 之间", trigger: "blur" }
    ],
    avatar: [
      { required: true, message: "请上传头像", trigger: "change" }
    ],
  };

  // 计算属性
  const currentPageData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return dataList.value.slice(start, end);
  });

  const cardThemeClass = computed(() => {
    return userStore.theme === "dark" ? "card-dark" : "card-light";
  });

  const isLastAdmin = computed(() => {
    const adminCount = dataList.value.filter(user => user.role === 'admin').length;
    return adminCount <= 1;
  });

  // 方法
  const fetchDataList = async () => {
    try {
      loading.value = true;
      const res = await getAdminUsers();
      if (res.code === 200) {
        dataList.value = res.data;
      } else {
        ElMessage.error(`获取数据失败: ${res.message}`);
      }
    } catch (error) {
      console.error("获取数据列表失败:", error);
      ElMessage.error("获取管理员列表失败");
    } finally {
      loading.value = false;
    }
  };

  const refreshData = () => {
    currentPage.value = 1;
    fetchDataList();
  };

  const handleCurrentChange = (val: number) => {
    currentPage.value = val;
  };

  const handleSizeChange = (val: number) => {
    pageSize.value = val;
    currentPage.value = 1;
  };

  const handleAdd = () => {
    dialogFormVisible.value = true;
    dialogTitle.value = "添加管理员";
    operationType.value = 1;
    editingId.value = null;
    resetForm();
  };

  const handleEdit = (row: any) => {
    dialogFormVisible.value = true;
    dialogTitle.value = "编辑管理员";
    operationType.value = 2;
    editingId.value = row.id;
    
    newFormData.username = row.username;
    newFormData.password = row.password;
    newFormData.role = row.role;
    newFormData.name = row.name;
    newFormData.age = row.age;
    newFormData.avatar = row.avatar;
    imageUrl.value = row.avatar;
  };

  const handleImageChange: UploadProps["onChange"] = (file) => {
    const isImage = file.raw?.type.startsWith("image/");
    if (!isImage) {
      ElMessage.error("请上传图片文件!");
      return;
    }

    const isLt2M = file.raw!.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      ElMessage.error("图片大小不能超过 2MB!");
      return;
    }

    imageUrl.value = URL.createObjectURL(file.raw!);
    newFormData.avatar = `https://example.com/upload/${file.name}`;
  };

  const confirmSubmit = async () => {
    if (!formRef.value) return;
    
    try {
      await formRef.value.validate();
      submitLoading.value = true;

      if (operationType.value === 1) {
        await handleAddData();
      } else if (operationType.value === 2) {
        await handleUpdateData();
      }
    } catch (error) {
      ElMessage.error("请填写完整的表单信息!");
    } finally {
      submitLoading.value = false;
    }
  };

  const handleAddData = async () => {
    try {
      const res = await addAdminUser(newFormData);
      if (res.code === 200) {
        ElMessage.success("添加管理员成功!");
        dialogFormVisible.value = false;
        resetForm();
        fetchDataList();
      } else {
        ElMessage.error(`添加失败: ${res.message}`);
      }
    } catch (error) {
      ElMessage.error("添加失败，请重试!");
      console.error("添加失败:", error);
    }
  };

  const handleUpdateData = async () => {
    if (!editingId.value) return;

    try {
      const res = await updateAdminUser(editingId.value, newFormData);
      if (res.code === 200) {
        ElMessage.success("更新管理员信息成功!");
         // 检查是否是修改自己的密码
        if (userStore.userData && editingId.value === userStore.userData.id && newFormData.password) {
        ElMessage('您修改了自己的密码，需要重新登录')
       // 清空 localStorage 和状态
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      userStore.token = null;
          userStore.userData = null;
          router.push('/login')
      
      }
        dialogFormVisible.value = false;
        resetForm();
        fetchDataList();
      } else {
        ElMessage.error(`更新失败: ${res.message}`);
      }
    } catch (error) {
      ElMessage.error("更新失败，请重试!");
      console.error("更新失败:", error);
    }
  };

  const handleDelete = async (row: any) => {
    try {
      await ElMessageBox.confirm(
        `确定要删除管理员 "${row.username}" 吗？此操作不可恢复。`,
        '删除确认',
        {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonClass: 'el-button--danger',
        }
      );

      const res = await deleteAdminUser(row.id);
      if (res.code === 200) {
        ElMessage.success('删除管理员成功!');
        fetchDataList();
        
        if (currentPageData.value.length === 0 && currentPage.value > 1) {
          currentPage.value -= 1;
        }
      } else {
        ElMessage.error(`删除失败: ${res.message}`);
      }
    } catch (error) {
      if (error === 'cancel') {
        ElMessage.info('已取消删除');
      } else {
        ElMessage.error('删除失败，请重试!');
        console.error('删除失败:', error);
      }
    }
  };

  const cancelSubmit = () => {
    dialogFormVisible.value = false;
    resetForm();
  };

  const resetForm = () => {
    newFormData.username = "";
    newFormData.password = "";
    newFormData.role = "";
    newFormData.name = "";
    newFormData.age = 0;
    newFormData.avatar = "";
    imageUrl.value = "";
    operationType.value = 1;
    editingId.value = null;
    if (formRef.value) {
      formRef.value.clearValidate();
    }
  };

  onMounted(() => {
    fetchDataList();
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
      width: 100%;
    }
  }

  .demo-pagination-block {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding: 10px 0;
  }

  .header-actions {
    display: flex;
    gap: 10px;
  }

  .avatar-uploader .avatar {
    width: 120px;
    height: 120px;
    display: block;
    object-fit: cover;
    border-radius: 6px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    width: 120px;
    height: 120px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .upload-tip {
    font-size: 12px;
    color: var(--el-text-color-secondary);
    margin-top: 8px;
  }

  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 20px;
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

      .el-pagination__total,
      .el-pagination__jump {
        color: yellow;
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