import { Controller, HttpResponse } from '@/presentation/protocols'
import { forbidden, serverError, ok } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { CheckProjectById, LoadProjectStats } from '@/domain/usecases'

export class LoadProjectStatsController implements Controller {
  constructor (
    private readonly checkProjectById: CheckProjectById,
    private readonly loadProjectStats: LoadProjectStats
  ) {}

  async handle (request: LoadProjectStatsController.Request): Promise<HttpResponse> {
    try {
      const { projectId, accountId } = request
      const exists = await this.checkProjectById.checkById(projectId)
      if (!exists) {
        return forbidden(new InvalidParamError('projectId'))
      }
      const projectStats = await this.loadProjectStats.load(projectId, accountId)
      return ok(projectStats)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadProjectStatsController {
  export type Request = {
    projectId: string
    accountId: string
  }
}
