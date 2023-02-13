import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { LoadProjectStats } from '@/domain/usecases'
import { RemoteLoadProjectStats } from '@/data/usecases'

export const makeRemoteLoadProjectStats = (projectId: string): LoadProjectStats =>
  new RemoteLoadProjectStats(makeApiUrl(`/projects/${projectId}/results`), makeAuthorizeHttpClientDecorator())
