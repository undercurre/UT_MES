import request from '@/plugin/axios'

// 首页
export function Index (query) {
  return request.get('MesOutreportMechiConfig/Index', {
    params: query
  })
}

// 查询
export function LoadData (query) {
  return request.get('MesOutreportMechiConfig/LoadData', {
    params: query
  })
}

// 保存
export function SaveData (data) {
  return request.post('MesOutreportMechiConfig/SaveData', data)
}

// 删除
export function DeleteOneById (data) {
  return request.post(`MesOutreportMechiConfig/DeleteOneById?id=${data}`, data)
}

// 根据条件获取相应的查询列表
export function GetSiteStatisticsConditionList (data) {
  return request.post('Kanban/GetSiteStatisticsConditionList', data)
}
