import { type MockMethod } from "vite-plugin-mock";

// 品牌数据样例
const mockBrands = [
  {
    id: 1,
    brandName: "Apple",
    logo: "https://www.3wen.com/userfiles/files/TUPIAN/hc/applelogo.jpg",
  },
  {
    id: 2,
    brandName: "Samsung",
    logo: "https://www.3wen.com/userfiles/images/l32-48.jpg",
  },
  {
    id: 3,
    brandName: "Sony",
    logo: "https://ts1.tc.mm.bing.net/th/id/R-C.f674f179e338b4254b3a2c31281c9c6d?rik=gQttOalOtVYqow&riu=http%3a%2f%2fwww.logo-sheji.cn%2fwp-content%2fuploads%2f2020%2f7%2f6NFz2e.jpg&ehk=FfZ4b6CzO%2fF8sI8yOWSlQ1%2fMAsjfqupR0jqf3Z%2fM4MI%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 4,
    brandName: "Nike",
    logo: "https://ts1.tc.mm.bing.net/th/id/R-C.e597633651ba2661b80c93f8179b89ce?rik=QGy1NJ2LztP7DQ&riu=http%3a%2f%2fpro.statics.logoqs.techuangyi.com%2f2017%2f12%2f22%2f9069dde9dd1665cfe29c9d283d32903a.jpg&ehk=odszrIRBX8O9noNC8%2f7PeoKzm5zbAIO5Us%2b7YYN96hk%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 5,
    brandName: "Adidas",
    logo: "https://pic.nximg.cn/file/20230402/32946559_232404090105_2.jpg",
  },
];

// 获取品牌列表接口
function brandListApiMock(): MockMethod {
  return {
    url: "/api/product/brand/get",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "获取品牌列表成功",
        data: mockBrands,
      };
    },
  };
}

// 添加品牌接口
function addBrandApiMock(): MockMethod {
  return {
    url: "/api/product/brand/add",
    method: "post",
    response: (request: { body: { brandName: string; logo: string } }) => {
      const { brandName, logo } = request.body;

      if (!brandName || !logo) {
        return {
          code: 400,
          message: "品牌名称和logo不能为空",
          data: null,
        };
      }

      const newBrand = {
        id: mockBrands.length + 1,
        brandName,
        logo,
      };

      mockBrands.push(newBrand);

      return {
        code: 200,
        message: "品牌添加成功",
        data: newBrand,
      };
    },
  };
}
// 更新品牌接口 - 修改部分
function updateBrandApiMock(): MockMethod {
  return {
    url: "/api/product/brand/update",
    method: "put",
    response: (request: { body: { id: number; brandName?: string; logo?: string } }) => {
      const { id, brandName, logo } = request.body;
      const brandIndex = mockBrands.findIndex((b) => b.id === id);

      if (brandIndex === -1) {
        return {
          code: 404,
          message: "品牌不存在",
          data: null,
        };
      }

      if (brandName) mockBrands[brandIndex].brandName = brandName;
      if (logo) mockBrands[brandIndex].logo = logo;

      return {
        code: 200,
        message: "品牌更新成功",
        data: mockBrands[brandIndex],
      };
    },
  };
}

// 删除品牌接口 - 修改部分
function deleteBrandApiMock(): MockMethod {
  return {
    url: "/api/product/brand/delete",
    method: "delete",
    response: (request: { body: { id: number } }) => {
      const { id } = request.body;
      const initialLength = mockBrands.length;
      const filteredBrands = mockBrands.filter((b) => b.id !== id);

      if (filteredBrands.length === initialLength) {
        return {
          code: 404,
          message: "品牌不存在",
          data: null,
        };
      }

      // 更新mock数据
      mockBrands.length = 0;
      mockBrands.push(...filteredBrands);

      return {
        code: 200,
        message: "品牌删除成功",
        data: null,
      };
    },
  };
}
// 导出所有Mock接口
export default [
  brandListApiMock(),
  addBrandApiMock(),
  updateBrandApiMock(),
  deleteBrandApiMock(),
] as MockMethod[];
