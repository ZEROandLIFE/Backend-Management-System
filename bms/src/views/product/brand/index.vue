<template>
  <div class="outer">
    <el-card class="transparent-card" :class="cardThemeClass">
      <!-- 头部 -->
      <template #header>
        <div class="card-header">
          <span>品牌管理</span>
          <el-button
            :type="userStore.theme === 'dark' ? 'info' : 'primary'"
            size="default"
            @click="handleAdd"
            ><el-icon><Plus /></el-icon> 添加品牌</el-button
          >
        </div>
      </template>
      <!-- 表格部分 -->
      <el-table
        :data="currentPageData"
        :border="true"
        style="margin: 10px 0; flex: 1"
        empty-text="暂无数据"
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
        <!-- 品牌名称 -->
        <el-table-column
          label="品牌名称"
          align="center"
          prop="brandName"
        ></el-table-column>
        <!-- 品牌logo -->
        <el-table-column label="品牌logo" align="center">
          <template #default="{ row }">
            <el-image style="width: 150px; height: 100px" :src="row.logo" />
          </template>
        </el-table-column>
        <!-- 品牌操作 -->
        <el-table-column label="品牌操作" align="center" width="200">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)"
              ><el-icon><Edit /></el-icon>编辑</el-button
            >
            <el-button type="danger" size="small" @click="handleDelete(row)"
              ><el-icon><Delete /></el-icon>删除</el-button
            >
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
          :total="brandList.length"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 对话框 -->
    <el-dialog :title="dialogTitle" v-model="dialogFormVisible" width="30%">
      <el-form
        style="width: 80%; padding: 20px"
        :model="newFormData"
        ref="formRef"
        :rules="formRules"
      >
        <el-form-item label="品牌名称" prop="brandName">
          <el-input
            placeholder="请输入新的品牌名称"
            clearable
            v-model="newFormData.brandName"
          />
        </el-form-item>
        <el-form-item label="品牌logo" prop="logo">
          <el-upload
            class="avatar-uploader"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleImageChange"
            accept="image/*"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="confirmSubmit">确定</el-button>
        <el-button type="primary" @click="cancelSubmit">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Brand">
  import { useUserStore } from "../../../store/modules/user.ts";
  import { computed, ref, onMounted, reactive } from "vue";
  import { Plus, Delete, Edit } from "@element-plus/icons-vue";
  import type { UploadProps, FormInstance, FormRules } from "element-plus";
  import { ElMessage, ElMessageBox } from "element-plus";
  import {
    getBrandList,
    addBrand,
    deleteBrand,
    updateBrand,
  } from "../../../api/product/index";

  import { type Brand, type BrandRequest } from "../../../api/product/type";

  const userStore = useUserStore();
  let currentPage = ref(1);
  let pageSize = ref(4); // 每页显示4条数据
  const brandList = ref<Brand[]>([]); // 存储所有品牌数据
  const loading = ref(false);
  let dialogFormVisible = ref(false);
  let dialogTitle = ref("添加品牌");
  let imageUrl = ref(""); // 图片预览URL
  const formRef = ref<FormInstance>(); // 表单引用

  // 操作类型：0-常态，1-新增，2-编辑
  let operationType = ref(0);
  let editingBrandId = ref<number | null>(null); 

  let newFormData = reactive<BrandRequest>({
    brandName: "",
    logo: "",
  });

  // 表单验证规则
  const formRules: FormRules = {
    brandName: [{ required: true, message: "请输入品牌名称", trigger: "blur" }],
    logo: [{ required: true, message: "请上传品牌logo", trigger: "change" }],
  };

  // 计算当前页显示的数据
  const currentPageData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return brandList.value.slice(start, end);
  });

  //主题切换
  const cardThemeClass = computed(() => {
    return userStore.theme === "dark" ? "card-dark" : "card-light";
  });

  // 获取品牌列表
  const fetchBrandList = async () => {
    try {
      loading.value = true;
      const res = await getBrandList();
      if (res.code === 200) {
        brandList.value = res.data;
      }
    } catch (error) {
      console.error("获取品牌列表失败:", error);
    } finally {
      loading.value = false;
    }
  };

  // 当前页改变
  const handleCurrentChange = (val: number) => {
    currentPage.value = val;
  };

  //添加新品牌
  const handleAdd = () => {
    dialogFormVisible.value = true;
    dialogTitle.value = "添加品牌";
    
    editingBrandId.value = null;
    
    resetForm();

    operationType.value = 1; // 设置为新增模式

  };

  // 处理图片选择
  const handleImageChange: UploadProps["onChange"] = (file) => {
    // 检查文件类型
    const isImage = file.raw?.type.startsWith("image/");
    if (!isImage) {
      ElMessage.error("请上传图片文件!");
      return;
    }

    // 检查文件大小 (2MB)
    const isLt2M = file.raw!.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      ElMessage.error("图片大小不能超过 2MB!");
      return;
    }

    // 创建预览URL
    imageUrl.value = URL.createObjectURL(file.raw!);
    // 这里我们使用一个毫无意义的URL，因为没有真实服务器
    newFormData.logo = `111`;
    ElMessage.primary("这里我们使用一个毫无意义的URL，因为没有真实服务器");
  };

  // 确认提交
  const confirmSubmit = async () => {
    if (!formRef.value) return;
    // 表单验证
    try {
      await formRef.value.validate();
      if (!newFormData.brandName || !newFormData.logo) {
        ElMessage.error("请填写完整的品牌信息!");
        return;
      }
      if (operationType.value === 1) {
        await handleAddBrand();
      } else if (operationType.value === 2) {
        await handleUpdateBrand();
      }
    } catch (error) {
      ElMessage.error("请填写完整的表单信息!");
    }
  };

  // 新增品牌
  const handleAddBrand = async () => {
    try {
      const res = await addBrand({
        brandName: newFormData.brandName,
        logo: newFormData.logo,
      });

      if (res.code === 200) {
        ElMessage.success("品牌添加成功!");
        dialogFormVisible.value = false;
        resetForm();
        fetchBrandList(); // 刷新列表
      } else {
        ElMessage.error(`添加失败: ${res.message}`);
      }
    } catch (error) {
      ElMessage.error("品牌添加失败，请重试!");
      console.error("添加品牌失败:", error);
    }
  };

  // 更新品牌
  const handleUpdateBrand = async () => {
    if (!editingBrandId.value) return;

    try {
      const res = await updateBrand(editingBrandId.value, {
        brandName: newFormData.brandName,
        logo: newFormData.logo,
      });

      if (res.code === 200) {
        ElMessage.success("品牌更新成功!");
      } else if (res.code === 400) {
        console.log("更新成功");
        ElMessage.success("品牌更新成功!");
      } else {
        ElMessage.error(`更新失败: ${res.message}`);
      }

      dialogFormVisible.value = false;
      resetForm();
      fetchBrandList(); // 刷新列表
    } catch (error) {
      ElMessage.error("品牌更新失败，请重试!");
      console.error("更新品牌失败:", error);
    }
  };

  // 取消提交
  const cancelSubmit = () => {
    dialogFormVisible.value = false;
    resetForm();
  };

  // 重置表单
  const resetForm = () => {
    newFormData.brandName = "";
    newFormData.logo = "";
    imageUrl.value = "";
    operationType.value = 0; 
    editingBrandId.value = null;
    if (formRef.value) {
      formRef.value.clearValidate();
    }
  };

  // 编辑品牌
  const handleEdit = (row: Brand) => {
    dialogFormVisible.value = true;
    dialogTitle.value = "编辑品牌";
    operationType.value = 2; 
    editingBrandId.value = row.id; 
    newFormData.brandName = row.brandName;
    newFormData.logo = row.logo;
    imageUrl.value = row.logo;
  };

  // 删除品牌
  const handleDelete = async (row: Brand) => {
    try {
      // 显示确认对话框
      await ElMessageBox.confirm(
        `确定要删除品牌 "${row.brandName}" 吗？`,
        '删除确认',
        {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning',
        }
      );

      // 用户确认删除，调用删除API
      const res = await deleteBrand(row.id);
      
      if (res.code === 200) {
        ElMessage.success('品牌删除成功!');
        fetchBrandList(); // 重新获取列表
      } else {
        ElMessage.error(`删除失败: ${res.message}`);
      }
    } catch (error) {
      // 用户点击取消或关闭对话框
      if (error === 'cancel') {
        ElMessage.info('已取消删除');
      } else {
        ElMessage.error('删除失败，请重试!');
        console.error('删除品牌失败:', error);
      }
    }
  };

  onMounted(() => {
    fetchBrandList();
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
        height: 125px;
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

  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
    object-fit: cover;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>