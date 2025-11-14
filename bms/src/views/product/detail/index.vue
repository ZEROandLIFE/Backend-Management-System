<template>
  <div class="product-detail">
    <!-- 无商品ID状态 -->
    <div v-if="!productStore.currentProductId" class="no-product">
      <el-card class="empty-card">
        <el-empty description="还没有选择商品" :image-size="200">
          <p class="empty-text">请前往商品列表选择要查看的商品</p>
          <el-button type="primary" @click="goToProductList">
            <el-icon><Goods /></el-icon>
            前往商品列表
          </el-button>
        </el-empty>
      </el-card>
    </div>

    <!-- 有商品ID状态 -->
    <div v-else>
      <el-card class="detail-card" v-loading="loading">
        <!-- 商品基本信息 -->
        <div class="product-basic">
          <el-row :gutter="30">
            <!-- 商品图片 -->
            <el-col :span="8">
              <div class="image-section">
                <el-image 
                  :src="productDetail?.logo" 
                  fit="contain" 
                  class="product-image"
                  :preview-src-list="productDetail?.logo ? [productDetail.logo] : []"
                />
              </div>
            </el-col>
            
            <!-- 商品信息 -->
            <el-col :span="16">
              <div class="info-section">
                <h1 class="product-name">{{ productDetail?.productName }}</h1>
                
                <div class="basic-info">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="info-item">
                        <span class="label">品牌：</span>
                        <el-tag type="primary">{{ productDetail?.brand }}</el-tag>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="info-item">
                        <span class="label">库存：</span>
                        <el-tag :type="productDetail && productDetail.stock > 10 ? 'success' : 'danger'">
                          {{ productDetail?.stock }} 件
                        </el-tag>
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <!-- 标签 -->
                <div class="tags-section">
                  <div class="label">标签：</div>
                  <div class="tags-container">
                    <el-tag 
                      v-for="tag in productDetail?.tags" 
                      :key="tag" 
                      type="info"
                      class="tag-item"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                </div>

                <!-- 编辑按钮 -->
                <div class="edit-section">
                  <el-button type="primary" @click="handleEdit">
                    <el-icon><Edit /></el-icon>
                    编辑商品信息
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 背景介绍 -->
        <div class="content-section" v-if="productDetail?.background">
          <h3 class="section-title">背景介绍</h3>
          <div class="content-box">
            {{ productDetail.background }}
          </div>
        </div>

        <!-- 详细描述 -->
        <div class="content-section" v-if="productDetail?.description">
          <h3 class="section-title">详细描述</h3>
          <div class="content-box">
            {{ productDetail.description }}
          </div>
        </div>

        <!-- 商品ID -->
        <div class="meta-info" v-if="productDetail?.id">
          <el-divider />
          <div class="meta-item">
            <span class="meta-label">商品ID：</span>
            <span class="meta-value">{{ productDetail.id }}</span>
          </div>
        </div>
      </el-card>

      <!-- 编辑对话框 -->
      <el-dialog :title="dialogTitle" v-model="dialogFormVisible" width="50%" :top="'5vh'">
        <el-form
          style="width: 90%; padding: 20px"
          :model="editFormData"
          ref="formRef"
          :rules="formRules"
          label-width="100px"
        >
          <el-form-item label="商品名称" prop="productName">
            <el-input
              placeholder="请输入商品名称"
              clearable
              v-model="editFormData.productName"
            />
          </el-form-item>

          <el-form-item label="品牌" prop="brand">
            <el-select
              v-model="editFormData.brand"
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
              v-model="editFormData.stock"
              :min="0"
              :max="9999"
              placeholder="请输入库存数量"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item label="商品标签" prop="tags">
            <el-select
              v-model="editFormData.tags"
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
              v-model="editFormData.background"
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
              v-model="editFormData.description"
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
              <img v-if="editImageUrl" :src="editImageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <div class="upload-tip">点击上传商品图片，建议尺寸 300x300px</div>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="cancelEdit">取消</el-button>
          <el-button type="primary" @click="confirmEdit">确定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, reactive } from 'vue'
import { useProductStore } from "../../../store/modules/product";
import { getProductById, updateProduct, getBrands, getTags } from "../../../api/products";
import type { Product, UpdateProductRequest } from "../../../api/products/type";
import { ElMessage } from "element-plus";
import { Goods, Edit, Plus } from "@element-plus/icons-vue";
import type { UploadProps, FormInstance, FormRules } from "element-plus";

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const loading = ref(false)
const productDetail = ref<Product | null>(null)

// 编辑相关状态
const dialogFormVisible = ref(false)
const dialogTitle = ref("编辑商品")
const formRef = ref<FormInstance>()
const editImageUrl = ref("")
const brandList = ref<string[]>([])
const tagList = ref<string[]>([])

// 编辑表单数据
const editFormData = reactive<UpdateProductRequest & { id?: number }>({
  productName: "",
  logo: "",
  stock: 0,
  tags: [],
  brand: "",
  background: "",
  description: "",
})

// 表单验证规则
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
}

onMounted(async () => {
  const routeId = route.params.id
  
  // 如果路由参数中有ID，更新store
  if (routeId) {
    productStore.currentProductId = Number(routeId)
  }
  
  // 如果store中有当前商品ID，获取商品详情
  if (productStore.currentProductId) {
    await fetchProductDetail(productStore.currentProductId)
  }

  // 获取品牌和标签列表
  await fetchBrandList()
  await fetchTagList()
})

// 获取商品详情
const fetchProductDetail = async (id: number) => {
  try {
    loading.value = true
    const res = await getProductById(id)
    if (res.code === 200 && res.data) {
      productDetail.value = res.data
    } else {
      ElMessage.error('获取商品详情失败')
    }
  } catch (error) {
    console.error('获取商品详情失败:', error)
    ElMessage.error('获取商品详情失败')
  } finally {
    loading.value = false
  }
}

// 获取品牌列表
const fetchBrandList = async () => {
  try {
    const res = await getBrands()
    if (res.code === 200) {
      brandList.value = res.data
    }
  } catch (error) {
    console.error('获取品牌列表失败:', error)
  }
}

// 获取标签列表
const fetchTagList = async () => {
  try {
    const res = await getTags()
    if (res.code === 200) {
      tagList.value = res.data
    }
  } catch (error) {
    console.error('获取标签列表失败:', error)
  }
}

// 编辑商品
const handleEdit = () => {
  if (!productDetail.value) return
  
  dialogFormVisible.value = true
  // 填充当前商品数据到编辑表单
  editFormData.productName = productDetail.value.productName
  editFormData.logo = productDetail.value.logo
  editFormData.stock = productDetail.value.stock
  editFormData.tags = [...productDetail.value.tags]
  editFormData.brand = productDetail.value.brand
  editFormData.background = productDetail.value.background
  editFormData.description = productDetail.value.description
  editImageUrl.value = productDetail.value.logo
}

// 确认编辑
const confirmEdit = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()

    if (!productStore.currentProductId) return

    const updateData: UpdateProductRequest = {
      productName: editFormData.productName,
      logo: editFormData.logo,
      stock: editFormData.stock,
      tags: editFormData.tags,
      brand: editFormData.brand,
      background: editFormData.background,
      description: editFormData.description,
    }

    const res = await updateProduct(productStore.currentProductId, updateData)

    if (res.code === 200) {
      ElMessage.success("更新成功!")
      dialogFormVisible.value = false
      // 重新获取商品详情以更新显示
      await fetchProductDetail(productStore.currentProductId)
    } else {
      ElMessage.error(`更新失败: ${res.message}`)
    }
  } catch (error) {
    ElMessage.error("请填写完整的表单信息!")
  }
}

// 取消编辑
const cancelEdit = () => {
  dialogFormVisible.value = false
  resetEditForm()
}

// 重置编辑表单
const resetEditForm = () => {
  editFormData.productName = ""
  editFormData.logo = ""
  editFormData.stock = 0
  editFormData.tags = []
  editFormData.brand = ""
  editFormData.background = ""
  editFormData.description = ""
  editImageUrl.value = ""
}

// 处理图片选择
const handleImageChange: UploadProps["onChange"] = (file) => {
  const isImage = file.raw?.type.startsWith("image/")
  if (!isImage) {
    ElMessage.error("请上传图片文件!")
    return
  }

  const isLt2M = file.raw!.size / 1024 / 1024 < 2
  if (!isLt2M) {
    ElMessage.error("图片大小不能超过 2MB!")
    return
  }

  editImageUrl.value = URL.createObjectURL(file.raw!)
  editFormData.logo = `https://example.com/upload/${file.name}`
  ElMessage.primary("这里我们使用一个示例URL，因为没有真实服务器")
}

// 前往商品列表
const goToProductList = () => {
  router.push('/products')
}
</script>

<style scoped lang="scss">
.product-detail {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 无商品状态样式 */
.no-product {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.empty-card {
  border: none !important;
  background: transparent;
  
  :deep(.el-card__body) {
    padding: 60px 40px;
  }
}

.empty-text {
  margin-top: 10px;
  color: #909399;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
}

/* 有商品状态样式 */
.detail-card {
  border: none !important;
  height: 100%;
  min-height: 500px;
  
  :deep(.el-card__body) {
    padding: 30px;
  }
}

.product-basic {
  margin-bottom: 30px;
}

.image-section {
  text-align: center;
}

.product-image {
  width: 100%;
  max-width: 400px;
  height: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.info-section {
  padding: 0 20px;
}

.product-name {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #303133;
}

.basic-info {
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
  .label {
    font-weight: 600;
    margin-right: 10px;
    color: #606266;
    min-width: 50px;
  }
}

.tags-section {
  .label {
    font-weight: 600;
    margin-bottom: 10px;
    color: #606266;
  }
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  margin-right: 8px;
  margin-bottom: 8px;
}

/* 编辑按钮区域 */
.edit-section {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
}

.content-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #303133;
  padding-bottom: 8px;
  border-bottom: 2px solid #409eff;
}

.content-box {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  line-height: 1.6;
  color: #606266;
  white-space: pre-line;
}

.meta-info {
  .meta-item {
    display: flex;
    align-items: center;
    
    .meta-label {
      font-weight: 600;
      color: #909399;
      margin-right: 10px;
    }
    
    .meta-value {
      color: #303133;
      font-family: monospace;
    }
  }
}

.tags-container,.info-item {
  .el-tag {
    font-size: 14px;
    padding: 0 10px;
    height: 28px;
    line-height: 28px;
  }
}

/* 对话框样式 */
.form-tip {
  margin-top: 4px;
  font-size: 12px;
  color: #909399;
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