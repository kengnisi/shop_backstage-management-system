import request from '@/utils/request'

// 请求sku列表信息
// /admin/product/list/1/10
export const reqSkuList = (page, limit) => {
  return request({
    url: `/admin/product/list/${page}/${limit}`,
    get: 'get'
  })
}

// 下架
// /admin/product/cancelSale/64
export const reqCancelSale = (skuId) => {
  return request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get'
  })
}
// 上架
// /admin/product/onSale/649
export const reqOnSale = (skuId) => {
  return request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'get'
  })
}
//获取SKU详情的接口
///admin/product/getSkuById/{skuId}  get
export const reqSkuById = (skuId)=>request({url:`/admin/product/getSkuById/${skuId}`,method:'get'});
