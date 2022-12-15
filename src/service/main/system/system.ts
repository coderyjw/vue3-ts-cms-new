import request from '@/service'

/** 用户的网络请求 */
export function postUsersListData(queryInfo: any) {
  return request.post({
    url: '/users/list',
    data: queryInfo
  })
}
