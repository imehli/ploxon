import { makeLogControllerDecorator, makeDbLoadStateByProject, makeDbSaveProjectStats } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { SaveProjectStatsController } from '@/presentation/controllers'

export const makeSaveProjectStatsController = (): Controller => {
  const controller = new SaveProjectStatsController(makeDbLoadStateByProject(), makeDbSaveProjectStats())
  return makeLogControllerDecorator(controller)
}
