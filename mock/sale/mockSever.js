// 先引进kockjs模块
import Mock from 'mockjs'
// 先把JSON数据格式引入进来[JSON数据格式根本没有对外暴露,但是需要引入]
// webpack默认对外暴露的:图片,JSON数据格式
import sale from './sale.json'

Mock.mock("/mock/sale", "get", {code: 200, data: sale})

// var Mock = require('mockjs')
// var data = Mock.mock({
//     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//     'list|1-10': [{
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1
//     }]
// })
// // 输出结果
// console.log(JSON.stringify(data, null, 4))