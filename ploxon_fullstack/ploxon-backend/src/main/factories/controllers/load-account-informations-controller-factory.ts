import { makeLogControllerDecorator, makeDbLoadAccountInformations } from '@/main/factories'
import { LoadAccountInformationsController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadAccountInformationsController = (): Controller => {
  const controller = new LoadAccountInformationsController(makeDbLoadAccountInformations())
  return makeLogControllerDecorator(controller)
}
