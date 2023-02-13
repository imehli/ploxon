import { adaptRoute } from '@/main/adapters'
import { makeAddProjectController, makeLoadProjectsController } from '@/main/factories'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/creatprojects', auth, adaptRoute(makeAddProjectController()))
  router.get('/projects', auth, adaptRoute(makeLoadProjectsController()))
}
