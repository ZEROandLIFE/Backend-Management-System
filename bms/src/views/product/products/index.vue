<template>
  <div class="outer">
    <el-card class="transparent-card" :class="cardThemeClass">
      <!-- 头部 -->
      <template #header>
        <div class="card-header">
          <span>商品列表</span>
          <div style="display: flex; align-items: center; gap: 10px">
            <!-- 搜索框 -->
            <div class="search-container">
              <el-select
                v-model="searchType"
                placeholder="搜索类型"
                style="width: 120px"
              >
                <el-option label="商品名称" value="name" />
                <el-option label="品牌" value="brand" />
                <el-option label="标签" value="tag" />
              </el-select>
              <el-input
                v-model="searchKeyword"
                placeholder="请输入搜索关键词"
                style="width: 200px; margin: 0 10px"
                @keyup.enter="handleSearch"
                clearable
              />
              <el-button
                type="primary"
                @click="handleSearch"
                :loading="searchLoading"
              >
                <el-icon><Search /></el-icon>
                搜索
              </el-button>
              <el-button @click="handleResetSearch"> 重置 </el-button>
            </div>
            <el-button
              :type="userStore.theme === 'dark' ? 'info' : 'primary'"
              size="default"
              @click="handleAdd"
            >
              <el-icon><Plus /></el-icon>
              添加商品
            </el-button>
          </div>
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
        <!-- 商品名称 -->
        <el-table-column
          label="商品名称"
          align="center"
          prop="productName"
        ></el-table-column>
        <!-- 品牌 -->
        <el-table-column
          label="品牌"
          align="center"
          prop="brand"
        ></el-table-column>
        <!-- 图片 -->
        <el-table-column label="商品图片" align="center">
          <template #default="{ row }">
            <el-image
              style="width: 150px; height: 100px"
              :src="row.logo"
              fit="contain"
            />
          </template>
        </el-table-column>
        <!-- 库存 -->
        <el-table-column label="库存" align="center" prop="stock">
          <template #default="{ row }">
            <el-tag :type="row.stock > 10 ? 'success' : 'danger'">
              {{ row.stock }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 标签 -->
        <el-table-column label="标签" align="center">
          <template #default="{ row }">
            <div
              style="
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
                justify-content: center;
              "
            >
              <el-tag
                v-for="tag in row.tags"
                :key="tag"
                size="small"
                :type="getTagType(tag)"
                class="clickable-tag"
                @click="handleTagClick(tag)"
              >
                {{ tag }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center" width="200">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)"
              ><el-icon><Edit /></el-icon>编辑</el-button
            >
            <el-button type="danger" size="small" @click="handleDelete(row)"
              ><el-icon><Delete /></el-icon>删除</el-button
            >
            <el-button type="primary" size="small" @click="handledetail(row)"
              ><el-icon><Delete /></el-icon>查看商品详情</el-button
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
          :total="displayList.length"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 对话框 -->
    <el-dialog :title="dialogTitle" v-model="dialogFormVisible" width="50%">
      <el-form
        style="width: 90%; padding: 20px"
        :model="newFormData"
        ref="formRef"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="商品名称" prop="productName">
          <el-input
            placeholder="请输入商品名称"
            clearable
            v-model="newFormData.productName"
          />
        </el-form-item>

        <el-form-item label="品牌" prop="brand">
          <el-select
            v-model="newFormData.brand"
            placeholder="请选择品牌"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="brand in brandList"
              :key="brand"
              :label="brand"
              :value="brand"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="库存数量" prop="stock">
          <el-input-number
            v-model="newFormData.stock"
            :min="0"
            :max="9999"
            placeholder="请输入库存数量"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="商品标签" prop="tags">
          <el-select
            v-model="newFormData.tags"
            multiple
            placeholder="请选择标签"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="tag in tagList"
              :key="tag"
              :label="tag"
              :value="tag"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="背景介绍" prop="background">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入商品背景介绍，不少于50字"
            v-model="newFormData.background"
            show-word-limit
            :maxlength="500"
          />
          <div class="form-tip">背景介绍用于简要描述商品特点和适用场景</div>
        </el-form-item>

        <el-form-item label="详细描述" prop="description">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入商品详细描述，不少于50字"
            v-model="newFormData.description"
            show-word-limit
            :maxlength="1000"
          />
          <div class="form-tip">详细描述用于全面介绍商品功能、规格和优势</div>
        </el-form-item>
        <el-form-item label="商品图片" prop="logo">
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
          <div class="upload-tip">点击上传商品图片，建议尺寸 300x300px</div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelSubmit">取消</el-button>
        <el-button type="primary" @click="confirmSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="ProductManagement">
  import { useUserStore } from "../../../store/modules/user.ts";
  import { computed, ref, onMounted, reactive } from "vue";
  import { Plus, Delete, Edit, Search } from "@element-plus/icons-vue";
  import type { UploadProps, FormInstance, FormRules } from "element-plus";
  import { ElMessage, ElMessageBox } from "element-plus";
  import { useRouter } from "vue-router";
  import {
    getAllProduct,
    deleteProduct,
    AddProduct,
    updateProduct,
    getBrands,
    getTags,
    searchProducts,
  } from "../../../api/products/index";
  import {
    type Product,
    type AddProductRequest,
    type UpdateProductRequest,
  } from "../../../api/products/type";

  const userStore = useUserStore();
  const router = useRouter();
  let currentPage = ref(1);
  let pageSize = ref(4);
  const productList = ref<Product[]>([]);
  const displayList = ref<Product[]>([]); // 显示的数据列表
  const brandList = ref<string[]>([]);
  const tagList = ref<string[]>([]);
  const loading = ref(false);
  const searchLoading = ref(false);
  let dialogFormVisible = ref(false);
  let dialogTitle = ref("添加商品");
  let imageUrl = ref("");
  const formRef = ref<FormInstance>();

  // 搜索相关状态
  const searchType = ref<"name" | "brand" | "tag">("name");
  const searchKeyword = ref("");
  const isSearching = ref(false);
  const activeTag = ref(""); // 当前激活的标签

  let operationType = ref(0);
  let editingId = ref<number | null>(null);

  let newFormData = reactive<AddProductRequest & { id?: number }>({
    productName: "",
    logo: "",
    stock: 0,
    tags: [],
    brand: "",
    background: "",
    description: "",
  });

  const formRules: FormRules = {
    productName: [
      { required: true, message: "请输入商品名称", trigger: "blur" },
      {
        min: 1,
        max: 50,
        message: "商品名称长度在 1 到 50 个字符",
        trigger: "blur",
      },
    ],
    brand: [{ required: true, message: "请选择品牌", trigger: "blur" }],
    stock: [
      { required: true, message: "请输入库存数量", trigger: "blur" },
      { type: "number", min: 0, message: "库存数量不能小于0", trigger: "blur" },
    ],
    tags: [
      { required: true, message: "请至少选择一个标签", trigger: "blur" },
    ],
    logo: [{ required: true, message: "请上传商品图片", trigger: "change" }],
    background: [
      { required: true, message: "请输入背景介绍", trigger: "blur" },
      {
        min: 50,
        message: "背景介绍不能少于50字",
        trigger: "blur",
      },
    ],
    description: [
      { required: true, message: "请输入详细描述", trigger: "blur" },
      {
        min: 50,
        message: "详细描述不能少于50字",
        trigger: "blur",
      },
    ],
  };

  // 计算当前页显示的数据
  const currentPageData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return displayList.value.slice(start, end);
  });

  // 主题切换
  const cardThemeClass = computed(() => {
    return userStore.theme === "dark" ? "card-dark" : "card-light";
  });

  // 获取标签类型（用于高亮显示）
  const getTagType = (tag: string) => {
    return activeTag.value === tag ? "primary" : "info";
  };

  // 获取商品列表
  const fetchProductList = async () => {
    try {
      loading.value = true;
      const res = await getAllProduct();
      if (res.code === 200) {
        productList.value = res.data.products;
        displayList.value = [...productList.value];
      } else {
        ElMessage.error(`获取商品列表失败: ${res.message}`);
      }
    } catch (error) {
      console.error("获取商品列表失败:", error);
      ElMessage.error("获取商品列表失败，请重试!");
    } finally {
      loading.value = false;
    }
  };

  // 获取品牌列表
  const fetchBrandList = async () => {
    try {
      const res = await getBrands();
      if (res.code === 200) {
        brandList.value = res.data;
      }
    } catch (error) {
      console.error("获取品牌列表失败:", error);
    }
  };

  // 获取标签列表
  const fetchTagList = async () => {
    try {
      const res = await getTags();
      if (res.code === 200) {
        tagList.value = res.data;
      }
    } catch (error) {
      console.error("获取标签列表失败:", error);
    }
  };

  // 搜索商品
  const handleSearch = async () => {
    if (!searchKeyword.value.trim()) {
      ElMessage.warning("请输入搜索关键词");
      return;
    }

    try {
      searchLoading.value = true;
      const res = await searchProducts(
        searchType.value,
        searchKeyword.value.trim()
      );
      if (res.code === 200) {
        displayList.value = res.data.products;
        isSearching.value = true;
        activeTag.value = ""; // 重置激活标签
        currentPage.value = 1; // 重置到第一页
        ElMessage.success(`找到 ${res.data.total} 个结果`);
      } else {
        ElMessage.error(`搜索失败: ${res.message}`);
      }
    } catch (error) {
      console.error("搜索失败:", error);
      ElMessage.error("搜索失败，请重试!");
    } finally {
      searchLoading.value = false;
    }
  };

  // 重置搜索
  const handleResetSearch = () => {
    searchKeyword.value = "";
    displayList.value = [...productList.value];
    isSearching.value = false;
    activeTag.value = "";
    currentPage.value = 1;
    ElMessage.info("已重置搜索");
  };

  // 标签点击事件
  const handleTagClick = async (tag: string) => {
    if (activeTag.value === tag) {
      handleResetSearch();
      return;
    }
    try {
      searchLoading.value = true;
      const res = await searchProducts("tag", tag);
      if (res.code === 200) {
        displayList.value = res.data.products;
        isSearching.value = true;
        activeTag.value = tag; // 设置激活标签
        currentPage.value = 1; // 重置到第一页
        ElMessage.success(`找到 ${res.data.total} 个带有"${tag}"标签的商品`);
      } else {
        ElMessage.error(`搜索失败: ${res.message}`);
      }
    } catch (error) {
      console.error("标签搜索失败:", error);
      ElMessage.error("搜索失败，请重试!");
    } finally {
      searchLoading.value = false;
    }
  };

  // 当前页改变
  const handleCurrentChange = (val: number) => {
    currentPage.value = val;
  };

  // 添加新商品
  const handleAdd = () => {
    dialogFormVisible.value = true;
    dialogTitle.value = "添加商品";
    editingId.value = null;
    resetForm();
    operationType.value = 1;
  };

  // 处理图片选择
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
    newFormData.logo = `https://example.com/upload/${file.name}`;
    ElMessage.primary("这里我们使用一个示例URL，因为没有真实服务器");
  };

  // 确认提交
  const confirmSubmit = async () => {
    if (!formRef.value) return;
    try {
      await formRef.value.validate();

      if (operationType.value === 1) {
        await handleAddProduct();
      } else if (operationType.value === 2) {
        await handleUpdateProduct();
      }
    } catch (error) {
      ElMessage.error("请填写完整的表单信息!");
    }
  };

  // 新增商品
  const handleAddProduct = async () => {
    try {
      const res = await AddProduct({
        productName: newFormData.productName,
        logo: newFormData.logo,
        stock: newFormData.stock,
        tags: newFormData.tags,
        brand: newFormData.brand,
        background: newFormData.background,
        description: newFormData.description,
      });

      if (res.code === 200) {
        ElMessage.success("添加成功!");
        dialogFormVisible.value = false;
        resetForm();
        fetchProductList();
        handleResetSearch(); // 重置搜索状态
      } else {
        ElMessage.error(`添加失败: ${res.message}`);
      }
    } catch (error) {
      ElMessage.error("添加失败，请重试!");
      console.error("添加失败:", error);
    }
  };

  // 更新商品
  const handleUpdateProduct = async () => {
    if (!editingId.value) return;

    try {
      const updateData: UpdateProductRequest = {
        productName: newFormData.productName,
        logo: newFormData.logo,
        stock: newFormData.stock,
        tags: newFormData.tags,
        brand: newFormData.brand,
        background: newFormData.background,
        description: newFormData.description,
      };

      const res = await updateProduct(editingId.value, updateData);

      if (res.code === 200) {
        ElMessage.success("更新成功!");
        dialogFormVisible.value = false;
        fetchProductList();
        handleResetSearch(); // 重置搜索状态
      } else {
        ElMessage.error(`更新失败: ${res.message}`);
      }
    } catch (error) {
      ElMessage.error("更新失败，请重试!");
      console.error("更新失败:", error);
    }
  };

  // 取消提交
  const cancelSubmit = () => {
    dialogFormVisible.value = false;
    resetForm();
  };

  // 重置表单
  const resetForm = () => {
    newFormData.productName = "";
    newFormData.logo = "";
    newFormData.stock = 0;
    newFormData.tags = [];
    newFormData.brand = "";
    newFormData.background = "";
    newFormData.description = "";
    imageUrl.value = "";
    operationType.value = 0;
    editingId.value = null;
    if (formRef.value) {
      formRef.value.clearValidate();
    }
  };

  // 编辑商品
  const handleEdit = (row: Product) => {
    dialogFormVisible.value = true;
    dialogTitle.value = "编辑商品";
    operationType.value = 2;
    editingId.value = row.id;

    newFormData.productName = row.productName;
    newFormData.logo = row.logo;
    newFormData.stock = row.stock;
    newFormData.tags = [...row.tags];
    newFormData.brand = row.brand;
    newFormData.background = row.background;
    newFormData.description = row.description;
    imageUrl.value = row.logo;
  };

  // 删除商品
  const handleDelete = async (row: Product) => {
    try {
      await ElMessageBox.confirm(
        `确定要删除商品 "${row.productName}" 吗？`,
        "删除确认",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "取消",
          type: "warning",
        }
      );

      const res = await deleteProduct(row.id);

      if (res.code === 200) {
        ElMessage.success("删除成功!");
        fetchProductList();
        handleResetSearch(); // 重置搜索状态
      } else {
        ElMessage.error(`删除失败: ${res.message}`);
      }
    } catch (error) {
      if (error === "cancel") {
        ElMessage.info("已取消删除");
      } else {
        ElMessage.error("删除失败，请重试!");
        console.error("删除失败:", error);
      }
    }
  };
  const handledetail = (row: Product) => {
    router.push(`/productdetail/${row.id}`);
  };
  onMounted(() => {
    fetchProductList();
    fetchBrandList();
    fetchTagList();
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

  .search-container {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .clickable-tag {
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

    /* 深色主题下的搜索框样式 */
    :deep(.search-container) {
      .el-input__inner {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.3);
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

  .upload-tip {
    margin-top: 8px;
    font-size: 12px;
    color: #909399;
  }

  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
    object-fit: cover;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
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
