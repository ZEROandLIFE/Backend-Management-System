<template>
  <div class="dashboard-container">
    <el-card class="welcome-card" :class="cardThemeClass">
      <!-- 欢迎头部 -->
      <template #header>
        <div class="card-header">
          <span>欢迎使用管理系统</span>
        </div>
      </template>

      <!-- 欢迎内容 -->
      <div class="welcome-content">
        <!-- 欢迎文字 -->
        <div class="welcome-text">
          <h1 class="welcome-title">欢迎回来！</h1>
          <p class="welcome-subtitle">今天是 {{ currentDate }}，祝您工作愉快！</p>
          <p class="welcome-desc">请从左侧菜单选择您要操作的功能模块</p>
        </div>

        <!-- 统计卡片 -->
        <el-row :gutter="20" class="stats-cards">
          <el-col :span="6">
            <el-card class="stat-card" shadow="hover">
              <div class="stat-content">
                <div class="stat-icon" style="background-color: #409eff;">
                  <el-icon><Document /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-number">1,234</div>
                  <div class="stat-label">总商品数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card" shadow="hover">
              <div class="stat-content">
                <div class="stat-icon" style="background-color: #67c23a;">
                  <el-icon><ShoppingBag /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-number">568</div>
                  <div class="stat-label">今日订单</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card" shadow="hover">
              <div class="stat-content">
                <div class="stat-icon" style="background-color: #e6a23c;">
                  <el-icon><User /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-number">89</div>
                  <div class="stat-label">新增用户</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card" shadow="hover">
              <div class="stat-content">
                <div class="stat-icon" style="background-color: #f56c6c;">
                  <el-icon><TrendCharts /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-number">¥45,678</div>
                  <div class="stat-label">今日销售额</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 快捷入口 -->
        <div class="quick-access">
          <h3 class="section-title">快捷入口</h3>
          <el-row :gutter="15">
            <el-col :span="6">
              <div class="quick-item" @click="goToProducts">
                <div class="quick-icon" style="background-color: #409eff;">
                  <el-icon><Goods /></el-icon>
                </div>
                <div class="quick-text">商品管理</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="quick-item" @click="goToBrands">
                <div class="quick-icon" style="background-color: #67c23a;">
                  <el-icon><List /></el-icon>
                </div>
                <div class="quick-text">品牌管理</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="quick-item" @click="goToUsers">
                <div class="quick-icon" style="background-color: #e6a23c;">
                  <el-icon><User /></el-icon>
                </div>
                <div class="quick-text">用户管理</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="quick-item" @click="goToScreen">
                <div class="quick-icon" style="background-color: #f56c6c;">
                  <el-icon><DataAnalysis /></el-icon>
                </div>
                <div class="quick-text">数据统计</div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 系统信息 -->
        <div class="system-info">
          <h3 class="section-title">系统信息</h3>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card shadow="never">
                <template #header>
                  <div class="info-header">
                    <el-icon><InfoFilled /></el-icon>
                    <span>版本信息</span>
                  </div>
                </template>
                <div class="info-content">
                  <p>系统版本：v1.0.0</p>
                  <p>最后更新：2025-11-12</p>
                  <p>技术支持：ZEROandLIFE</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="never">
                <template #header>
                  <div class="info-header">
                    <el-icon><Bell /></el-icon>
                    <span>系统公告</span>
                  </div>
                </template>
                <div class="info-content">
                  <p>• 系统维护通知：本周六 2:00-4:00</p>
                  <p>• 新功能上线：商品批量导入</p>
                  <p>• 温馨提示：请及时备份数据</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/modules/user'
import { 
  Document, 
  ShoppingBag, 
  User, 
  TrendCharts,
  Goods,
  List,
  DataAnalysis,
  InfoFilled,
  Bell
} from '@element-plus/icons-vue'

const userStore = useUserStore()
const router = useRouter()

// 当前日期
const currentDate = computed(() => {
  return new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
})

// 主题样式
const cardThemeClass = computed(() => {
  return userStore.theme === 'dark' ? 'card-dark' : 'card-light'
})

// 快捷跳转方法
const goToProducts = () => {
  router.push('/products')
}

const goToBrands = () => {
  router.push('/brand')
}

const goToUsers = () => {
  router.push('/users')
}

const goToScreen = () => {
  router.push('/screen')
}
</script>

<style scoped lang="scss">
.dashboard-container {
  padding: 20px;
  height: 100%;
}

.welcome-card {
  border: none !important;
  height: 100%;
  
  :deep(.el-card__header) {
    border-bottom: none !important;
    padding-bottom: 0;
  }
}

.card-header {
  span {
    font-size: 24px;
    font-weight: 600;
  }
}

.welcome-content {
  padding: 20px 0;
}

.welcome-text {
  text-align: center;
  margin-bottom: 40px;
  
  .welcome-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #409eff, #67c23a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .welcome-subtitle {
    font-size: 18px;
    color: #606266;
    margin-bottom: 8px;
  }
  
  .welcome-desc {
    font-size: 14px;
    color: #909399;
  }
}

.stats-cards {
  margin-bottom: 40px;
}

.stat-card {
  border: none;
  border-radius: 12px;
  
  :deep(.el-card__body) {
    padding: 20px;
  }
}

.stat-content {
  display: flex;
  align-items: center;
  
  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    
    .el-icon {
      font-size: 24px;
      color: white;
    }
  }
  
  .stat-info {
    .stat-number {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    
    .stat-label {
      font-size: 14px;
      color: #909399;
    }
  }
}

.quick-access {
  margin-bottom: 40px;
  
  .section-title {
    font-size: 18px;
    margin-bottom: 20px;
    color: #303133;
  }
}

.quick-item {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-color: #409eff;
  }
  
  .quick-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    
    .el-icon {
      font-size: 24px;
      color: white;
    }
  }
  
  .quick-text {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
  }
}

.system-info {
  .section-title {
    font-size: 18px;
    margin-bottom: 20px;
    color: #303133;
  }
  
  :deep(.el-card) {
    border: none;
    border-radius: 12px;
    
    .el-card__header {
      border-bottom: 1px solid #f0f0f0;
      padding: 15px 20px;
    }
  }
}

.info-header {
  display: flex;
  align-items: center;
  font-weight: 600;
  
  .el-icon {
    margin-right: 8px;
    color: #409eff;
  }
}

.info-content {
  p {
    margin: 8px 0;
    color: #606266;
    font-size: 14px;
  }
}
/* 深色主题样式 */
.card-dark {
  color: #ffffff;

  :deep(.el-card__header) {
    background-color: rgba(0, 0, 0, 0.3) !important;
    color: #ffffff;
  }

  :deep(.el-card__body) {
    background-color: rgba(0, 0, 0, 0.3) !important;
    color: #ffffff;
  }
  
  .welcome-title,
  .welcome-subtitle,
  .welcome-desc,
  .stat-number,
  .stat-label,
  .quick-text,
  .section-title,
  .info-content p {
    color: #ffffff;
  }

  .welcome-title {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .stat-card,
  .quick-item {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
  
  :deep(.system-info .el-card) {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    
    .el-card__header {
      border-bottom-color: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
  }

  .info-header {
    color: #ffffff;
    
    .el-icon {
      color: #66b1ff;
    }
  }

  .info-content p {
    color: #e4e7ed;
  }


  :deep(.el-card) {
    color: #ffffff;
  }

  :deep(.el-card__header) span {
    color: #ffffff;
  }

  .stat-info .stat-number {
    color: #ffffff;
  }

  .stat-info .stat-label {
    color: #c0c4cc;
  }

  .quick-access .section-title {
    color: #ffffff;
  }

  .system-info .section-title {
    color: #ffffff;
  }
}


/* 浅色主题样式 */
.card-light {
  color: #303133;

  :deep(.el-card__header) {
    background-color: rgba(255, 255, 255, 0.3) !important;
  }

  :deep(.el-card__body) {
    background-color: rgba(255, 255, 255, 0.3) !important;
  }
}
</style>