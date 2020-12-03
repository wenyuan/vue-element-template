/**
 * Mock api: just for demo
 * All http method is: Get
 */

import request from '@/utils/request'

export function getStudentList(data) {
  /**
   * @url: static json file, splice timestamp to solve the cache problem(304 not modified)
   * @method: request the JSON file directly can only use GET method
   */
  return request({
    url: '/mock/students/list.json?t=' + new Date().getTime().toString(), // Splice timestamp
    method: 'get',
    data
  })
}

export function addStudent(data) {
  return request({
    url: '/mock/students/add.json?t=' + new Date().getTime().toString(), // Splice timestamp
    method: 'get',
    data
  })
}

export function updateStudent(data) {
  return request({
    url: '/mock/students/update.json?t=' + new Date().getTime().toString(), // Splice timestamp
    method: 'get',
    data
  })
}

export function deleteStudent(data) {
  return request({
    url: '/mock/students/delete.json?t=' + new Date().getTime().toString(), // Splice timestamp
    method: 'get',
    data
  })
}

export function deleteStudents(data) {
  return request({
    url: '/mock/students/bulk_delete.json?t=' + new Date().getTime().toString(), // Splice timestamp
    method: 'get',
    data
  })
}

export function checkSNoExist(data) {
  return request({
    url: '/mock/students/bulk_delete.json?t=' + new Date().getTime().toString(), // Splice timestamp
    method: 'get',
    data
  })
}

export function uploadAvatar(data) {
  return request({
    url: '/mock/students/upload_avatar.json?t=' + new Date().getTime().toString(), // Splice timestamp
    method: 'get',
    data
  })
}

export function uploadExcel(data) {
  return request({
    url: '/mock/students/upload_excel.json?t=' + new Date().getTime().toString(), // Splice timestamp
    method: 'get',
    data
  })
}

export function downloadExcel(data) {
  return request({
    url: '/mock/students/download_excel.json?t=' + new Date().getTime().toString(), // Splice timestamp
    method: 'get',
    data
  })
}
