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
    background:
      "iPhone 14 Pro 是苹果公司于 2022 年推出的高端智能手机，搭载 A16 仿生芯片，支持灵动岛交互设计，摄影能力大幅提升，尤其适合追求极致体验的用户。",
    description:
      "iPhone 14 Pro 配备 6.1 英寸超视网膜 XDR 显示屏，支持 ProMotion 自适应刷新率技术，最高 120Hz 刷新率。后置 4800 万像素主摄 + 1200 万像素超广角 + 1200 万像素长焦三摄系统，支持电影效果模式、夜景模式等专业功能。机身采用手术级不锈钢边框，支持 IP68 防尘防水，续航时间比上一代提升 2 小时。",
  },
  {
    id: 2,
    productName: "MacBook Air M2",
    logo: "https://ts3.tc.mm.bing.net/th/id/OIP-C.9IyFJS49rqforDoffs-vFAHaEK?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 30,
    tags: ["新品", "限时优惠", "便携"],
    brand: "Apple",
    background:
      "MacBook Air M2 是苹果首款搭载 M2 芯片的轻薄笔记本，性能与能效比大幅提升，适合学生、设计师和移动办公人群。",
    description:
      "MacBook Air M2 配备 13.6 英寸 Liquid 视网膜显示屏，支持 10 亿色彩显示，亮度最高 500 尼特。机身厚度仅 11.3 毫米，重量 1.24 千克，内置 52.6 瓦时电池，续航时间最长 18 小时。搭载 M2 芯片（8 核 CPU + 10 核 GPU），相比 M1 性能提升 18%。支持 Wi-Fi 6 和蓝牙 5.0，配备 MagSafe 充电接口和两个雷雳 4 端口。",
  },
  {
    id: 3,
    productName: "Samsung Galaxy S23",
    logo: "https://img14.360buyimg.com/pop/jfs/t1/140488/11/33531/37730/63d921d5Feb099058/c73c34d9c66f2799.png",
    stock: 45,
    tags: ["热门", "高性价比", "旗舰款"],
    brand: "Samsung",
    background:
      "Samsung Galaxy S23 是三星 2023 年旗舰机型，搭载骁龙 8 Gen 2 芯片，配备超视觉夜拍系统，适合摄影爱好者和游戏玩家。",
    description:
      "Galaxy S23 采用 6.1 英寸 Dynamic AMOLED 2X 显示屏，支持 120Hz 自适应刷新率，峰值亮度 1750 尼特。后置 5000 万像素主摄 + 1200 万像素超广角 + 1000 万像素长焦三摄，支持 8K 视频录制和超视觉夜拍功能。内置 3900mAh 电池，支持 25W 有线快充和 15W 无线充电。机身支持 IP68 防尘防水，提供悠雾黑、悠柔白、悠野绿和悠远紫四种配色。",
  },
  {
    id: 4,
    productName: "Sony WH-1000XM5",
    logo: "https://tse4-mm.cn.bing.net/th/id/OIP-C.GM1xTrPMWpsf9TL7ZEPbjQHaLT?o=7&cb=ucfimgc2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    stock: 25,
    tags: ["推荐", "高性价比", "便携"],
    brand: "Sony",
    background:
      "Sony WH-1000XM5 是索尼旗舰降噪耳机，搭载集成处理器 V1 和 HD 降噪处理器 QN1，提供行业领先的降噪效果和音质表现。",
    description:
      "WH-1000XM5 采用 30 毫米驱动单元，支持 LDAC 高解析度音频传输和 DSEE Extreme 数字增强技术。内置 8 麦克风系统，支持智能免摘对话功能。单次充电续航时间最长 30 小时（降噪开启），支持快充（充电 3 分钟播放 3 小时）。耳机重量 250 克，支持多点连接和触控操作，提供黑色和银色两种配色。",
  },
  {
    id: 5,
    productName: "iPad Pro",
    logo: "https://pic1.zhimg.com/v2-1a06c8ec4ac2f4d29e1f9f2baee8987c_720w.jpg?source=172ae18b",
    stock: 35,
    tags: ["新品", "限时优惠", "高性能"],
    brand: "Apple",
    background:
      "iPad Pro 是苹果专业级平板电脑，2022 年款搭载 M2 芯片，支持 Apple Pencil 第二代和妙控键盘，适合创意工作者和学生。",
    description:
      "iPad Pro 提供 11 英寸和 12.9 英寸 Liquid 视网膜 XDR 显示屏，支持 ProMotion 自适应刷新率（最高 120Hz）。后置 1200 万像素广角摄像头 + 1000 万像素超广角摄像头，支持 4K 视频录制。前置 1200 万像素超广角摄像头（支持人物居中功能）。内置四扬声器系统，支持空间音频。支持 5G 网络和 Wi-Fi 6E，提供 128GB/256GB/512GB/1TB/2TB 存储容量选项。",
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
        background: string; // 新增字段
        description: string; // 新增字段
      };
    }) => {
      const { productName, logo, stock, tags, brand, background, description } =
        request.body;

      // 校验必填字段
      if (
        !productName ||
        !logo ||
        stock === undefined ||
        !tags ||
        !brand ||
        !background ||
        !description
      ) {
        return {
          code: 400,
          message: "商品信息不完整",
          data: null,
        };
      }

      // 校验品牌和标签
      if (!mockBrands.includes(brand)) {
        return { code: 400, message: `无效的品牌: ${brand}`, data: null };
      }
      const invalidTags = tags.filter((tag) => !mockTags.includes(tag));
      if (invalidTags.length > 0) {
        return {
          code: 400,
          message: `无效的标签: ${invalidTags.join(", ")}`,
          data: null,
        };
      }

      // 校验描述长度
      if (background.length < 50 || description.length < 50) {
        return {
          code: 400,
          message: "背景介绍和详细描述需至少 50 字",
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
        background,
        description,
      };

      mockProducts.push(newProduct);
      return { code: 200, message: "商品添加成功", data: newProduct };
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
        background?: string;
        description?: string;
      };
    }) => {
      const {
        id,
        productName,
        logo,
        stock,
        tags,
        brand,
        background,
        description,
      } = request.body;
      const productIndex = mockProducts.findIndex((p) => p.id === id);

      if (productIndex === -1) {
        return {
          code: 404,
          message: "商品不存在",
          data: null,
        };
      }
      // 校验描述长度
      if (
        (background && background.length < 50) ||
        (description && description.length < 50)
      ) {
        return {
          code: 400,
          message: "背景介绍和详细描述需至少 50 字",
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
      const product = mockProducts[productIndex];
      if (background !== undefined) product.background = background;
      if (description !== undefined) product.description = description;
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
