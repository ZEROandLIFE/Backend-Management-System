// 品牌数据类型
export interface Brand {
  id: number; // 品牌ID
  brandName: string; // 品牌名称
  logo: string; // 品牌logo URL
}

// 品牌列表响应数据类型
export interface BrandListResponse {
  code: number; // 响应状态码
  message: string; // 响应消息
  data: Brand[]; // 品牌数据数组
}

// 添加/更新品牌请求数据类型
export interface BrandRequest {
  brandName: string; // 品牌名称
  logo: string; // 品牌logo URL
}

// 添加/更新品牌响应数据类型
export interface BrandResponse {
  code: number; // 响应状态码
  message: string; // 响应消息
  data: Brand | null; // 操作返回的品牌数据（删除操作时为null）
}

// 删除品牌响应数据类型（与BrandResponse相同，但可以单独定义以便扩展）
export type DeleteBrandResponse = BrandResponse;
