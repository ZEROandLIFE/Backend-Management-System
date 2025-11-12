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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from 'vue'
import { useProductStore } from "../../../store/modules/product";
import { getProductById } from "../../../api/products";
import type { Product } from "../../../api/products/type";
import { ElMessage } from "element-plus";
import { Goods } from "@element-plus/icons-vue";

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const loading = ref(false)
const productDetail = ref<Product | null>(null)

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
/* 修改普通标签样式 */
.tags-container,.info-item {
  .el-tag {
    font-size: 14px; /* 调整普通标签字体大小 */
    padding: 0 10px;
    height: 28px;
    line-height: 28px;
  }
}
</style>