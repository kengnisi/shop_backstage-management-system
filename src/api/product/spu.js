import request from '@/utils/request'

// 获取spu列表数据的接口
// /admin/product/{page}/{limit}  get 携带数据page limit catrgory3Id
export const reqSpuList = (page, limit, category3Id) => {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: {category3Id}
  })
}


// 添加或修spu页面的数据获取
// 获取SPU信息
// /admin/product/getSpuById/{spuId}
export const reqSpuById = (spuId) => {
  return request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
  })
}
// 图片信息
// /admin/product/spuImageList/{spuId}
export const reqspuImageList = (spuId) => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}
// 获取品牌信息
// admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () => {
  return request({
    url: 'admin/product/baseTrademark/getTrademarkList',
    method: 'get'
  })
}
// 销售属性列表
// /admin/product/baseSaleAttrList
export const reqbaseSaleAttrList = () => {
  return request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get'
  })
}

// 修改或添加spu
export const reqAddOrUpdataSpu = (spuInfo) => {
  // 修改
  if(spuInfo.id) {
    return request({
      url: "/admin/product/updateSpuInfo",
      data: spuInfo,
      method: 'post'
    })
  } else {
    // 添加
    return request({
      url: "/admin/product/saveSpuInfo",
      data: spuInfo,
      method: 'post'
    })
  }
}

// 删除spu
// /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => {
  return request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
  })
}

//获取图片的数据
///admin/product/spuImageList/{spuId}  get
// export const reqSpuImageLIst = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});


//获取销售属性的数据
///admin/product/spuSaleAttrList/{spuId}  get
export const reqSpuSaleAttrList = (spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'});

//获取平台属性的数据
//GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'});

//保存sku
// /admin/product/saveSkuInfo post
export const reqSaveSku = (skuInfo) => {
  return request({
    url: '/admin/product/saveSkuInfo',
    method: 'post',
    data: skuInfo
  })
}

// 获取sku列表信息
// /admin/product/findBySpuId/skuId
export const reqSkuList = (spuId) => {
  return request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
  })
}
