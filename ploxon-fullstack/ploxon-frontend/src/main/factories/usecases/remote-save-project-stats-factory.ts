import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { SaveProjectStats } from '@/domain/usecases'
import { RemoteSaveProjectStats } from '@/data/usecases'

export const makeRemoteSaveProjectStats = (projectId: string): SaveProjectStats =>
  new RemoteSaveProjectStats(makeApiUrl(`/projects/${projectId}/results`), makeAuthorizeHttpClientDecorator())
