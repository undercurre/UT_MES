import request from '@/plugin/axios'

// 获取产品规格
export function GetPNModel (PART_NO) {
  return request.get('SmtStencilPart/GetPNModel', {
    params: {
      PART_NO
    }
  })
}

// 添加或修改视图
export function AddOrModify () {
  return request.get('SmtStencilPart/AddOrModify')
}

//
export function SaveData (data) {
  return request.post('SmtStencilPart/SaveData', data)
}
//  产品编号搜索 NAME: 产品名称 CODE: 产品编号 DESCRIPTION: 产品规格 搜索按钮对应的处理也是这个方法
export function PartNoLoadData (data) {
  return request.get('SmtStencilPart/PartNoLoadData', {
    params: data
  })
}
// 位号
export function GetStencilLOC (query) {
  return request.get('SmtStencilPart/GetStencilLOC', {
    params: query
  })
}
// 钢网信息打印
export function GetStencilPrint (query) {
  return request({
    url: 'SmtStencilConfig/GetStencilPrint',
    method: 'get',
    params: query
  })
}
// 钢网借用
export function SaveOut (data) {
  return request.post('SmtStencilConfig/SaveOut', data)
}
// 钢网归还
export function SaveIn (data) {
  return request.post('SmtStencilConfig/SaveIn', data)
}
// 钢网借用/归还明细
export function GetStencilIODetail (query) {
  return request.get('SmtStencilConfig/GetStencilIODetail', {
    params: query
  })
}
