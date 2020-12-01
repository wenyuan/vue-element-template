import request from '@/utils/request'

export function getStudentList(data) {
  return request({
    url: '/api/students/list/',
    method: 'post',
    data
  })
}
