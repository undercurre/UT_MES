import request from '@/plugin/axios'

// 首页视图
export function Index (query) {
  return request.get('MesOutreportConfig/Index', {
    params: query
  })
}

// 查询
export function LoadData (query) {
  return request.get('MesOutreportConfig/LoadData', {
    params: query
  })
}

// 根据条件获取相应的查询列表
export function GetSiteStatisticsConditionList (data) {
  return request.post('Kanban/GetSiteStatisticsConditionList', data)
}

// 保存
export function SaveData (data) {
  return request.post('MesOutreportConfig/SaveData', data)
}

// 删除
export function DeleteOneById (data) {
  return request.post(`MesOutreportConfig/DeleteOneById?id=${data}`)
}

// 获取检验项配置数据
export function LoadOutreportIteamConfigList (query) {
  return request.get('MesOutreportConfig/LoadOutreportIteamConfigList', {
    params: query
  })
}

// 保存检验项配置
export function SaveOutreportIteamConfig (data) {
  return request.post('MesOutreportConfig/SaveOutreportIteamConfig', data)
}

// 获取检验参数值配置数据
export function LoadOutreportNoConfigList (query) {
  return request.get('MesOutreportConfig/LoadOutreportNoConfigList', {
    params: query
  })
}

// 保存检验参数值配置数据
export function SaveOutreportNoConfig (data) {
  return request.post('MesOutreportConfig/SaveOutreportNoConfig', data)
}

export function GetPartByPartNo (query) {
  return request.get('MesTongsInfo/GetPartByPartNo', {
    params: query
  })
}
