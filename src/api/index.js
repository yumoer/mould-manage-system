import request from '../utils/request';

/*登录接口*/
export const Login = query => {
  return request({
    url: '/auth2/',
    method: 'post',
    data: query, // json
  });
};

/*获取广告列表接口*/
export const getContent = data => {
  return request({
    url: '/partner/content/',
    method: 'get',
    params: data,
  });
};

/*新增广告列表接口*/
export const getAddContent = data => {
  return request({
    url: '/partner/content/',
    method: 'post',
    data: data,
  });
};

/*更改广告接口*/
export const getEditContent = (data) => {
  console.log(data)
  return request({
    url: '/partner/content/'+data.id+'/details/',
    method: 'post',
    data: data
  });
};

/*删除广告接口*/
export const getDeleteContent = (data) => {
  return request({
    url: '/partner/content/'+data.id+'/',
    method: 'delete',
    data: data
  });
};

/*查询分类列表*/
export const getGoodsCategory = data => {
  return request({
    url: '/partner/goods/category/',
    method: 'get',
    params: data,
  });
};

/*删除分类列表*/
export const getDeleteCategory = data => {
  return request({
    url: '/partner/goods/category/'+data.id+'/',
    method: 'delete',
    params: data,
  });
};

/*新增分类列表*/
export const getAddCategory = data => {
  return request({
    url: '/partner/goods/category/',
    method: 'post',
    params: data,
  });
};

/*更改分类列表*/
export const getEditCategory = data => {
  return request({
    url: '/partner/goods/category/'+data.id+'/details',
    method: 'post',
    data: data,
  });
};

/*查询订单列表*/
export const getOrderInfo = data => {
  return request({
    url: '/partner/order/info/',
    method: 'get',
    params: data,
  });
};

/*获取所有订单商品*/
export const getGoodsIdOrder = data => {
  console.log(data)
  return request({
    url: '/partner/order/goods/',
    method: 'get',
    params:data,
  });
};

/*获取所有商品评价*/
export const getGoodsOrder = data => {
  return request({
    url: '/partner/goods/comments/',
    method: 'get',
    params: data,
  });
};

/*获取品牌列表*/
export const getGoodsBrand = data => {
  return request({
    url: '/partner/brand/',
    method: 'get',
    params: data,
  });
};

/*查询商品SKU列表*/
export const getSkus = data => {
  return request({
    url: '/partner/skus/',
    method: 'get',
    params: data,
  });
};

/*更改商品SKU*/
export const getEditSkus = data => {
  return request({
    url: '/partner/skus/'+data.id+'/',
    method: 'PUT',
    data: data,
  });
};

/*删除商品SKU*/
export const getDelSkus = data => {
  return request({
    url: '/partner/skus/'+data.id+'/',
    method: 'delete',
    data: data,
  });
};

/*添加商品SKU*/
export const getAddSkus = data => {
  return request({
    url: '/partner/skus/',
    method: 'post',
    data: data,
  });
};

/*查询商品SPU列表*/
export const getSpus = data => {
  return request({
    url: '/partner/spus/',
    method: 'get',
    params: data,
  });
};



/*获取分类的商品SPU列表*/
export const getSgoodsCategory = data => {
  return request({
    url: '/categories/get/goods_category/',
    method: 'get',
    params: data,
  });
};

/*获取第一级分类的商品SPU列表*/
export const getSpusCategory1 = id => {
  return request({
    url: '/partner/spus/'+id+'/category1/',
    method: 'get',
    params: data,
  });
};

/*获取第二级分类的商品SPU列表*/
export const getSpusCategory2 = id => {
  return request({
    url: 'categories/get/goods_category/'+id+'/',
    method: 'get',
  });
};

/*获取第三级分类的商品SPU列表*/
export const getSpusCategory3 = id => {
  return request({
    url: 'categories/get/goods_category/'+id+'/',
    method: 'get',
  });
};

/*更改商品SPU*/
export const getEditSpus = data => {
  return request({
    url: '/partner/spus/'+data.id+'/',
    method: 'PUT',
    data: data,
  });
};

/*删除商品SPU*/
export const getDelSpus = data => {
  return request({
    url: '/partner/spus/'+data.id+'/',
    method: 'delete',
    data: data,
  });
};

/*添加商品SPU*/
export const getAddSpus = data => {
  return request({
    url: '/partner/spus/',
    method: 'post',
    data: data,
  });
};


/*获取SPU规格列表*/
export const getGoodsSpecification = data => {
  return request({
    url: '/partner/goods/specification/',
    method: 'get',
    params: data,
  });
};

/*删除SPU规格*/
export const getDeleteSpecification = data => {
  return request({
    url: '/partner/goods/specification/'+data.id+'/',
    method: 'delete',
    data: data,
  });
};

/*添加SPU规格*/
export const getAddSpecification = data => {
  return request({
    url: '/partner/goods/specification/',
    method: 'post',
    data: data,
  });
};

/*更改SPU规格*/
export const getEditSpecification = data => {
  return request({
    url: '/partner/goods/specification/'+data.id+'/',
    method: 'put',
    data: data,
  });
};

/*获取规格选项列表*/
export const getSpecificationOption = data => {
  return request({
    url: '/partner/specification/option/',
    method: 'get',
    params: data,
  });
};

/*删除SPU规格选项*/
export const getDeleteSpecificationOption = data => {
  return request({
    url: '/partner/specification/option/'+data.id+'/',
    method: 'delete',
    data: data,
  });
};

/*添加SPU规格选项*/
export const getAddSpecificationOption = data => {
  return request({
    url: '/partner/specification/option/'+data.spec_id+'/specification/',
    method: 'post',
    data: data,
  });
};

/*更改SPU规格选项*/
export const getEditSpecificationOption = data => {
  return request({
    url: '/partner/specification/option/'+data.id+'/',
    method: 'put',
    data: data,
  });
};

/*获取sku规格列表*/
export const getSkuSpecification = data => {
  return request({
    url: '/partner/sku/specification/',
    method: 'get',
    params: data,
  });
};

/*删除sku规格*/
export const getDeleteSkuSpecification = data => {
  return request({
    url: '/partner/sku/specification/'+data.id+'/',
    method: 'delete',
    data: data,
  });
};

/*添加sku规格*/
export const getAddSkuSpecification = data => {
  return request({
    url: '/partner/sku/specification/'+data.sku_id+'/sku/',
    method: 'post',
    data: data,
  });
};

/*获取sku图片列表*/
export const getSkuImage = data => {
  return request({
    url: '/partner/sku/image/',
    method: 'get',
    params: data,
  });
};

/*删除sku图片*/
export const getDeleteSkuImage = data => {
  return request({
    url: '/partner/sku/image/'+data.id+'/',
    method: 'delete',
    data: data,
  });
};

/*添加sku图片*/
export const getAddSkuImage = data => {
  return request({
    url: '/partner/sku/image/'+data.sku_id+'/sku/',
    method: 'post',
    data: data,
  });
};

/*更改sku图片*/
export const getEditSkuImage = data => {
  return request({
    url: '/partner/sku/image/'+data.id+'/',
    method: 'put',
    data: data,
  });
};






