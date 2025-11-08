import request from "../../utils/request";
import {
  type BrandRequest,
  type BrandResponse,
  type Brand,
  type BrandListResponse,
} from "./type";
const apis = {
  GET_BRAND_LIST: "/product/brand/get",
  ADD_BRAND: "/product/brand/add",
  UPDATE_BRAND: "/product/brand/update/",
  DELETE_BRAND: "/product/brand/delete/",
};
export const getBrandList = () => {
   return request.get<any,BrandListResponse>(apis.GET_BRAND_LIST);
};
export const addBrand = (data: BrandRequest) => {
   return request.post<any, BrandResponse>(apis.ADD_BRAND, data);
};
export const updateBrand = (id: number, data: BrandRequest) => {
  return request.put<any, BrandResponse>(apis.UPDATE_BRAND, {
    id,
    ...data,
  });
};

export const deleteBrand = (id: number) => {
  return request.delete<any, BrandResponse>(apis.DELETE_BRAND, {
    data: { id },
  });
};

