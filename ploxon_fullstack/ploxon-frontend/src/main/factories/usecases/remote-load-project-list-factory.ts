import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { LoadProjectList } from '@/domain/usecases'
import { RemoteLoadProjectList } from '@/data/usecases'

export const makeRemoteLoadProjectList = (): LoadProjectList =>
  new RemoteLoadProjectList(makeApiUrl('/projects'), makeAuthorizeHttpClientDecorator())
