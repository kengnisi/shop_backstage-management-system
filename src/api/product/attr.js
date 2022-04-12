import request from '@/utils/request'

// 平台属性管理
// 获取一级分类
// /admin/product/getCategory1
export const reqCategory1List = () => {
  return request({
    url: '/admin/product/getCategory1',
    method: 'get'
  })
}

// 获取二级分类
// /admin/product/getCategory2/{category1Id}
export const reqCategory2List = (category1Id) => {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get'
  })
}

// 获取三级分类
// /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id) => {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
  })
}

// 获取平台属性接口
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

// 添加属性和属性值接口
// /admin/product/saveAttrInfo
export const reqAddOrUpdateAttr = (data) => {
  console.log(data)
  return request({
    url: '/admin/product/saveAttrInfo',
    data,
    method: "post"
  })
}
// {
//   "attrName": "string",属性名
//   "attrValueList": [ 属性名中的属性值，属性值可以多个，因此需要的是数组
//     {
//       "attrId": 0, 属性值的id
//       "valueName": "string" 属性值
//     }
//   ],
//   "categoryId": 0,   category3Id
//   "categoryLevel": 3,
// }
