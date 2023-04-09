import { Controller, HttpResponse } from '@/presentation/protocols'
import { forbidden, serverError, ok } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { LoadStateByProject, SaveProjectStats } from '@/domain/usecases'

export class SaveProjectStatsController implements Controller {
  constructor (
    private readonly loadStateByProject: LoadStateByProject,
    private readonly saveProjectStats: SaveProjectStats
  ) {}

  async handle (request: SaveProjectStatsController.Request): Promise<HttpResponse> {
    try {
      const { projectId } = request
      const states = await this.loadStateByProject.loadState(projectId)
      if (!states) {
        return forbidden(new InvalidParamError('projectId'))
      } else if (!states.rate) {
        return forbidden(new InvalidParamError('rate'))
      }
      const projectStats = await this.saveProjectStats.save({
        ...request,
        date: new Date()
      })
      return ok(projectStats)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SaveProjectStatsController {
  export type Request = {
    projectId: string
    accountId: string
    description: string
    resources: string
  }
}
