import request from '@/plugin/axios'

// 工序配置 首页
export function Index () {
  return request({
    url: 'SopSkillStandard/Index',
    method: 'get'
  })
}
// 查询所有 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request({
    url: 'SopSkillStandard/LoadData',
    method: 'get',
    params: query
  })
}

// 添加或修改的相关操作
export function AddOrModifySave (query) {
  let formdata = new FormData()
  if (query.ID)formdata.append('ID', query.ID)
  formdata.append('OPERATION_ID', query.OPERATION_ID)
  formdata.append('STANDARD', query.STANDARD)
  formdata.append('TRAIN_NAME', query.TRAIN_NAME)
  return request.post('SopSkillStandard/AddOrModifySave', formdata)
}

// 通过ID更改激活状态
export function ChangeEnabled (query) {
  let formdata = new FormData()
  formdata.append('Id', query.Id)
  formdata.append('Status', query.Status)
  formdata.append('Operator', query.Operator)
  formdata.append('OperatorDatetime', query.OperatorDatetime)
  return request.post('SopSkillStandard/ChangeEnabled', formdata)
}

export function ExportData (query) {
  return request.get('SopSkillStandard/ExportData', {
    params: query
  })
}

// 获取工序数据
export function LoadOperationData (query) {
  return request.get('SopSkillStandard/LoadOperationData', {
    params: query
  })
}
// 获取工序技能评判标准数据
export function LoadSkillStandardData (query) {
  return request({
    url: 'SopSkillStandard/LoadSkillStandardData',
    method: 'get',
    params: query
  })
}

export function DeleteOneById (query) {
  return request.post('SopSkillStandard/DeleteOneById', null, {
    params: {
      Id: query
    }
  })
}
