// 商品数据类型
export interface Product {
  id: number; // 商品ID
  productName: string; // 商品名称
  logo: string; // 商品图片 URL
  stock: number; // 剩余数量
  tags: string[]; // 标签数组
  brand: string; // 品牌
}

// 商品列表响应数据类型
export interface ProductListResponse {
  code: number; // 响应状态码
  message: string; // 响应消息
  data: {
    products: Product[]; // 商品数据数组
    total: number; // 总数量
  };
}

// 添加商品请求数据类型
export interface AddProductRequest {
  productName: string; // 商品名称
  logo: string; // 商品图片 URL
  stock: number; // 剩余数量
  tags: string[]; // 标签数组
  brand: string; // 品牌
}

// 更新商品请求数据类型
export interface UpdateProductRequest {
  productName?: string; // 商品名称
  logo?: string; // 商品图片 URL
  stock?: number; // 剩余数量
  tags?: string[]; // 标签数组
  brand?: string; // 品牌
}

// 商品响应数据类型
export interface ProductResponse {
  code: number; // 响应状态码
  message: string; // 响应消息
  data: Product | null; // 操作返回的商品数据（删除操作时为null）
}

// 删除商品响应数据类型
export type DeleteProductResponse = ProductResponse;

// 搜索商品请求数据类型
export interface SearchProductRequest {
  searchType: "name" | "tag" | "brand"; // 搜索类型
  keyword: string; // 搜索关键词
}

// 搜索商品响应数据类型
export interface SearchProductResponse {
  code: number; // 响应状态码
  message: string; // 响应消息
  data: {
    products: Product[]; // 搜索到的商品数据数组
    total: number; // 搜索结果总数量
  };
}

// 标签列表响应数据类型
export interface TagListResponse {
  code: number; // 响应状态码
  message: string; // 响应消息
  data: string[]; // 标签数据数组
}

// 品牌列表响应数据类型
export interface BrandListResponse {
  code: number; // 响应状态码
  message: string; // 响应消息
  data: string[]; // 品牌数据数组
}
