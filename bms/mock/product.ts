import { type MockMethod } from "vite-plugin-mock";

// 标签列表
const mockTags = [
  "热门",
  "新品",
  "推荐",
  "限时优惠",
  "高性价比",
  "旗舰款",
  "便携",
  "高性能",
];

// 品牌列表
const mockBrands = ["Apple", "Samsung", "Sony"];

// 商品数据样例
const mockProducts = [
  {
    id: 1,
    productName: "iPhone 14 Pro",
    logo: "https://img14.360buyimg.com/pop/jfs/t1/223850/31/14455/20834/63191800E303a21e8/f99edecca19f7f3b.jpg",
    stock: 50,
    tags: ["热门", "推荐", "旗舰款", "高性能"],
    brand: "Apple",
  },
  {
    id: 2,
    productName: "MacBook Air M2",
    logo: "https://ts3.tc.mm.bing.net/th/id/OIP-C.9IyFJS49rqforDoffs-vFAHaEK?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 30,
    tags: ["新品", "限时优惠", "便携"],
    brand: "Apple",
  },
  {
    id: 3,
    productName: "Samsung Galaxy S23",
    logo: "https://img14.360buyimg.com/pop/jfs/t1/140488/11/33531/37730/63d921d5Feb099058/c73c34d9c66f2799.png",
    stock: 45,
    tags: ["热门", "高性价比", "旗舰款"],
    brand: "Samsung",
  },
  {
    id: 4,
    productName: "Sony WH-1000XM5",
    logo: "https://tse4-mm.cn.bing.net/th/id/OIP-C.GM1xTrPMWpsf9TL7ZEPbjQHaLT?o=7&cb=ucfimgc2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 25,
    tags: ["推荐", "高性价比", "便携"],
    brand: "Sony",
  },
  {
    id: 5,
    productName: "iPad Pro",
    logo: "https://pic1.zhimg.com/v2-1a06c8ec4ac2f4d29e1f9f2baee8987c_720w.jpg?source=172ae18b",
    stock: 35,
    tags: ["新品", "限时优惠", "高性能"],
    brand: "Apple",
  },
];

// 1. 获取全部商品
function getAllProductsApiMock(): MockMethod {
  return {
    url: "/api/product/getAll",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "获取商品列表成功",
        data: {
          products: mockProducts,
          total: mockProducts.length,
        },
      };
    },
  };
}

// 2. 根据ID获取商品
function getProductByIdApiMock(): MockMethod {
  return {
    url: "/api/product/get",
    method: "get",
    response: (request: { query: { id: string } }) => {
      const { id } = request.query;
      const productId = parseInt(id);

      const product = mockProducts.find((p) => p.id === productId);

      if (!product) {
        return {
          code: 404,
          message: "商品不存在",
          data: null,
        };
      }

      return {
        code: 200,
        message: "获取商品成功",
        data: product,
      };
    },
  };
}

// 3. 添加商品
function addProductApiMock(): MockMethod {
  return {
    url: "/api/product/add",
    method: "post",
    response: (request: {
      body: {
        productName: string;
        logo: string;
        stock: number;
        tags: string[];
        brand: string;
      };
    }) => {
      const { productName, logo, stock, tags, brand } = request.body;

      if (!productName || !logo || stock === undefined || !tags || !brand) {
        return {
          code: 400,
          message: "商品信息不完整",
          data: null,
        };
      }

      // 验证品牌是否存在
      if (!mockBrands.includes(brand)) {
        return {
          code: 400,
          message: `无效的品牌: ${brand}`,
          data: null,
        };
      }

      // 验证标签是否存在
      const invalidTags = tags.filter((tag) => !mockTags.includes(tag));
      if (invalidTags.length > 0) {
        return {
          code: 400,
          message: `无效的标签: ${invalidTags.join(", ")}`,
          data: null,
        };
      }

      const newProduct = {
        id: Math.max(...mockProducts.map((p) => p.id)) + 1,
        productName,
        logo,
        stock,
        tags,
        brand,
      };

      mockProducts.push(newProduct);

      return {
        code: 200,
        message: "商品添加成功",
        data: newProduct,
      };
    },
  };
}

// 4. 移除指定ID商品
function deleteProductApiMock(): MockMethod {
  return {
    url: "/api/product/delete",
    method: "delete",
    response: (request: { body: { id: number } }) => {
      const { id } = request.body;
      const initialLength = mockProducts.length;
      const filteredProducts = mockProducts.filter((p) => p.id !== id);

      if (filteredProducts.length === initialLength) {
        return {
          code: 404,
          message: "商品不存在",
          data: null,
        };
      }

      // 更新mock数据
      mockProducts.length = 0;
      mockProducts.push(...filteredProducts);

      return {
        code: 200,
        message: "商品删除成功",
        data: null,
      };
    },
  };
}

// 5. 搜索商品
function searchProductsApiMock(): MockMethod {
  return {
    url: "/api/product/search",
    method: "post",
    response: (request: {
      body: {
        searchType: "name" | "tag" | "brand";
        keyword: string;
      };
    }) => {
      const { searchType, keyword } = request.body;

      if (!searchType || !keyword) {
        return {
          code: 400,
          message: "搜索类型和关键词不能为空",
          data: null,
        };
      }

      let filteredProducts = [];

      if (searchType === "name") {
        // 按商品名称搜索（模糊匹配）
        filteredProducts = mockProducts.filter((product) =>
          product.productName.toLowerCase().includes(keyword.toLowerCase())
        );
      } else if (searchType === "tag") {
        // 按标签名称搜索
        filteredProducts = mockProducts.filter((product) =>
          product.tags.some((tag) =>
            tag.toLowerCase().includes(keyword.toLowerCase())
          )
        );
      } else if (searchType === "brand") {
        // 按品牌搜索
        filteredProducts = mockProducts.filter((product) =>
          product.brand.toLowerCase().includes(keyword.toLowerCase())
        );
      }

      return {
        code: 200,
        message: "搜索成功",
        data: {
          products: filteredProducts,
          total: filteredProducts.length,
        },
      };
    },
  };
}

// 6. 修改指定ID商品
function updateProductApiMock(): MockMethod {
  return {
    url: "/api/product/update",
    method: "put",
    response: (request: {
      body: {
        id: number;
        productName?: string;
        logo?: string;
        stock?: number;
        tags?: string[];
        brand?: string;
      };
    }) => {
      const { id, productName, logo, stock, tags, brand } = request.body;
      const productIndex = mockProducts.findIndex((p) => p.id === id);

      if (productIndex === -1) {
        return {
          code: 404,
          message: "商品不存在",
          data: null,
        };
      }

      // 验证品牌是否存在（如果传了brand）
      if (brand && !mockBrands.includes(brand)) {
        return {
          code: 400,
          message: `无效的品牌: ${brand}`,
          data: null,
        };
      }

      // 验证标签是否存在（如果传了tags）
      if (tags && tags.length > 0) {
        const invalidTags = tags.filter((tag) => !mockTags.includes(tag));
        if (invalidTags.length > 0) {
          return {
            code: 400,
            message: `无效的标签: ${invalidTags.join(", ")}`,
            data: null,
          };
        }
      }

      // 更新商品信息
      if (productName) mockProducts[productIndex].productName = productName;
      if (logo) mockProducts[productIndex].logo = logo;
      if (stock !== undefined) mockProducts[productIndex].stock = stock;
      if (tags) mockProducts[productIndex].tags = tags;
      if (brand) mockProducts[productIndex].brand = brand;

      return {
        code: 200,
        message: "商品更新成功",
        data: mockProducts[productIndex],
      };
    },
  };
}

// 获取标签列表
function getTagsApiMock(): MockMethod {
  return {
    url: "/api/product/tags/get",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "获取标签列表成功",
        data: mockTags,
      };
    },
  };
}

// 获取品牌列表
function getBrandsApiMock(): MockMethod {
  return {
    url: "/api/product/brands/get",
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

// 导出所有Mock接口
export default [
  getAllProductsApiMock(),
  getProductByIdApiMock(),
  addProductApiMock(),
  deleteProductApiMock(),
  searchProductsApiMock(),
  updateProductApiMock(),
  getTagsApiMock(),
  getBrandsApiMock(),
] as MockMethod[];
