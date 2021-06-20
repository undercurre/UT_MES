import request from '@/plugin/axios'

// 首页
export function Index (query) {
  return request.get('MesWorkTimeHeader/Index', {
    params: query
  })
}

// 查询
export function LoadData (query) {
  return request.get('MesWorkTimeHeader/LoadData', {
    params: query
  })
}
// 根据条件获取相应的查询列表
export function GetSiteStatisticsConditionList (data) {
  return request.post('Kanban/GetSiteStatisticsConditionList', data)
}

// 获取标准工时工序类别
export function LoadWorkTimeTypeDetailList (query) {
  return request.get('MesWorkTimeHeader/LoadWorkTimeTypeDetailList', {
    params: query
  })
}

// 获取标准工时工序
export function LoadWorkTimeDetailList (query) {
  return request.get('MesWorkTimeHeader/LoadWorkTimeDetailList', {
    params: query
  })
}

export function GetPartByPartNo (query) {
  return request.get('MesTongsInfo/GetPartByPartNo', {
    params: query
  })
}
// 保存
export function SaveData (data) {
  return request.post('MesWorkTimeHeader/SaveData', data)
}

// 添加工时管理数据
export function AddWorkTimeHeader (data) {
  return request.post('MesWorkTimeHeader/AddWorkTimeHeader', data)
}

// 变更工时管理数据
export function ModifyWorkTimeVersion (data) {
  return request.post('MesWorkTimeHeader/ModifyWorkTimeVersion', data)
}

// 审核工时管理
export function AuditWorkTimeHeader (data) {
  return request.post('MesWorkTimeHeader/AuditWorkTimeHeader', data)
}

// 保存标准工时工序数据
export function SaveWorkTimeDetail (data) {
  return request.post('MesWorkTimeHeader/SaveWorkTimeDetail', data)
}

// 保存标准工时工序类别数据
export function SaveWorkTimeTypeDetail (data) {
  return request.post('MesWorkTimeHeader/SaveWorkTimeTypeDetail', data)
}
