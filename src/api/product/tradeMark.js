import request from '@/utils/request'

// 请求商品管理信息
// /admin/product/baseTrademark/{page}/{limit}
export function reqTradeMark(page, limit) {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}

// 修改或者添加品牌
// 添加
// /admin/product/baseTrademark/save 参数{logoUrl, tmName}
// 修改
// /admin/product/baseTrademark/update 参数{id, logoUrl, tmName}
export function reqaddOrUpdateTrademack(tmForm) {
  if(!tmForm.id) {
    return request({
      url: '/admin/product/baseTrademark/save',
      data: tmForm,
      method: 'post'
    })
  }else {
    return request({
      url: '/admin/product/baseTrademark/update',
      data: tmForm,
      method: 'put'
    })
  }
}

// 删除tradeMark数据
// /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}

