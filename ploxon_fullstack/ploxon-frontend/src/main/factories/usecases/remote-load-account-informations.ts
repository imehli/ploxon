import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { LoadAccountInformations } from '@/domain/usecases'
import { RemoteLoadAccountInformations } from '@/data/usecases'

export const makeRemoteLoadAccountInformations = (): LoadAccountInformations =>
  new RemoteLoadAccountInformations(makeApiUrl('/account'), makeAuthorizeHttpClientDecorator())
