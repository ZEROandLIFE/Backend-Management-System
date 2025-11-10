import { da } from "element-plus/es/locales.mjs";
import request from "../../utils/request";
import {
  type Product,
  type ProductListResponse,
  type AddProductRequest,
  type UpdateProductRequest,
  type ProductResponse,
  type DeleteProductResponse,
  type SearchProductRequest,
  type SearchProductResponse,
  type TagListResponse,
  type BrandListResponse,
} from "./type";
const apis = {
  GET_ALL_PRODUCTS: "/product/getAll",
  GET_PRODUCT_BY_ID: "/product/get",
  ADD_PRODUCT: "/product/add",
  DELETE_PRODUCT: "/product/delete",
  SEARCH_PRODUCT: "/product/search",
  UPDATE_PRODUCT: "/product/update",
  GET_TAGS: "/product/tags/get",
  GET_BRANDS: "/product/brands/get",
};
export const getAllProduct = () => {
  return request.get<any, ProductListResponse>(apis.GET_ALL_PRODUCTS);
};
export const getProductById = (id: number) => {
  return request.get<any, ProductResponse>(apis.GET_PRODUCT_BY_ID, {
    params: { id },
  });
};
export const AddProduct = (data: AddProductRequest) => {
  return request.post<any, ProductResponse>(apis.ADD_PRODUCT, data);
};
export const deleteProduct = (id: number) => {
  return request.delete<any, DeleteProductResponse>(apis.DELETE_PRODUCT, {
    data: { id },
  });
};
export const searchProducts = (
  searchType: "name" | "tag" | "brand",
  keyword: string
) => {
  return request.post<any, SearchProductResponse>(apis.SEARCH_PRODUCT, {
    searchType,
    keyword,
  });
};
export const updateProduct = (id: number, data: UpdateProductRequest) => {
  return request.put<any, ProductResponse>(apis.UPDATE_PRODUCT, {
    id,
    ...data,
  });
};
export const getTags = () => {
  return request.get<any, TagListResponse>(apis.GET_TAGS);
};
export const getBrands = () => {
  return request.get<any, BrandListResponse>(apis.GET_BRANDS);
};
