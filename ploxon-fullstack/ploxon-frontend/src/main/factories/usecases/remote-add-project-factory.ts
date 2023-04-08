import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { AddProject } from '@/domain/usecases'
import { RemoteAddProject } from '@/data/usecases'

export const makeRemoteAddProject = (): AddProject =>
  new RemoteAddProject(makeApiUrl('/creatprojects'), /* makeAxiosHttpClient, */ makeAuthorizeHttpClientDecorator())
