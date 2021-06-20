import axios from 'axios'

export function SaveUserRole (data) {
  return axios.post('http://192.168.100.173:42731/Role/SaveUserRole', data)
}

export function GetRoleList () {
  return axios.get('http://192.168.100.173:42731/Role/GetRoleList')
}

export function GetUserRole (empno) {
  return axios.get('http://192.168.100.173:42731/Role/GetUserRole', {
    params: {
      empno
    }
  })
}
