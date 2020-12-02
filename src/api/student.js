import request from '@/utils/request'

export function getStudentList(data) {
  return request({
    url: '/api/students/list/',
    method: 'post',
    data
  })
}

export function addStudent(data) {
  return request({
    url: '/api/students/add/',
    method: 'post',
    data
  })
}

export function updateStudent(data) {
  let sno = data.get('sno')
  return request({
    url: `/api/students/${sno}/update/`,
    method: 'post',
    data
  })
}

export function deleteStudent(data) {
  let sno = data.get('sno')
  return request({
    url: `/api/students/${sno}/delete/`,
    method: 'post',
    data
  })
}

export function deleteStudents(data) {
  return request({
    url: '/api/students/delete/',
    method: 'post',
    data
  })
}

export function uploadAvatar(data) {
  return request({
    url: '/api/students/upload_avatar/',
    method: 'post',
    data
  })
}

export function uploadExcel(data) {
  return request({
    url: '/api/students/upload_excel/',
    method: 'post',
    data
  })
}

export function downloadExcel(data) {
  return request({
    url: '/api/students/download_excel/',
    method: 'post',
    data
  })
}
