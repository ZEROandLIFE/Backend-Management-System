// // GET 请求，无参数
// const response = await fetch("/api/product/getAll");
// const result = await response.json();
// console.log(result.data.products);

// // GET 请求，参数在query中
// const productId = 1;
// const response = await fetch(`/api/product/get?id=${productId}`);
// const result = await response.json();
// console.log(result.data);

// // POST 请求
// const newProduct = {
//   productName: "iPhone 15",
//   logo: "https://example.com/iphone15.jpg",
//   stock: 100,
//   tags: ["新品", "热门", "旗舰款"],
//   brand: "Apple"
// };

// const response = await fetch('/api/product/add', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(newProduct),
// });
// const result = await response.json();
// console.log(result.data);

// // DELETE 请求
// const response = await fetch('/api/product/delete', {
//   method: 'DELETE',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ id: 1 }),
// });
// const result = await response.json();
// console.log(result.message);

// // 按名称搜索
// const searchByName = {
//   searchType: "name" as const,
//   keyword: "iPhone"
// };

// // 按标签搜索
// const searchByTag = {
//   searchType: "tag" as const,
//   keyword: "热门"
// };

// // 按品牌搜索
// const searchByBrand = {
//   searchType: "brand" as const,
//   keyword: "Apple"
// };

// const response = await fetch('/api/product/search', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(searchByName), // 可以替换为其他搜索条件
// });
// const result = await response.json();
// console.log(result.data.products);

// // PUT 请求
// const updateData = {
//   id: 1,
//   productName: "iPhone 14 Pro Max",
//   stock: 60,
//   tags: ["热门", "旗舰款", "高性能", "限时优惠"]
// };

// const response = await fetch('/api/product/update', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(updateData),
// });
// const result = await response.json();
// console.log(result.data);

// // GET 请求
// const response = await fetch('/api/product/tags/get');
// const result = await response.json();
// console.log(result.data);

// // GET 请求
// const response = await fetch('/api/product/brands/get');
// const result = await response.json();
// console.log(result.data);