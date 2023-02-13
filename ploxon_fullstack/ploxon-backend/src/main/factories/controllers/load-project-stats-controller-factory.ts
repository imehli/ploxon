import { makeLogControllerDecorator, makeDbCheckProjectById, makeDbLoadProjectStats } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadProjectStatsController } from '@/presentation/controllers'

export const makeLoadProjectStatsController = (): Controller => {
  const controller = new LoadProjectStatsController(makeDbCheckProjectById(), makeDbLoadProjectStats())
  return makeLogControllerDecorator(controller)
}
