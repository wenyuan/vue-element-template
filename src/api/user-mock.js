/**
 * Mock api: just for demo
 * All http method is: Get
 */

import request from '@/utils/request'

export function login(data) {
  /**
   * @url: static json file, splice timestamp to solve the cache problem(304 not modified)
   * @method: request the JSON file directly can only use GET method
   */
  return request({
    url: '/mock/user/login.json?t=' + new Date().getTime().toString(), // Splice timestamp
    method: 'get',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/mock/user/info.json?t=' + new Date().getTime().toString(), // Splice timestamp
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/mock/user/logout.json?t=' + new Date().getTime().toString(), // Splice timestamp
    method: 'get'
  })
}
