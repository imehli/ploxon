import { makeSaveProjectStatsController, makeLoadProjectStatsController } from '@/main/factories'
import { adaptRoute } from '@/main/adapters'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/projects/:projectId/results', auth, adaptRoute(makeLoadProjectStatsController()))
  router.put('/projects/:projectId/results', auth, adaptRoute(makeSaveProjectStatsController()))
}
