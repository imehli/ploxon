import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeLoadAccountInformationsController } from '@/main/factories'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/account', auth, adaptRoute(makeLoadAccountInformationsController()))
}
