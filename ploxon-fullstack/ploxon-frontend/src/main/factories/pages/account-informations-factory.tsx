import { makeRemoteLoadAccountInformations } from '@/main/factories/usecases'
import { AccountInformations } from '@/presentation/pages'

import React from 'react'

export const makeAccountInformations: React.FC = () => {
  return (
    <AccountInformations
      loadAccountInformations={makeRemoteLoadAccountInformations()}
    />
  )
}
