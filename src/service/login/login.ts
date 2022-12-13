import request from '..'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  return request.post({
    url: '/login',
    data: account
  })
}
