import Styles from './list-styles.scss'
import { LoadAccountInformations } from '@/domain/usecases'
import { AccountInformationsItem, AccountInformationsItemEmpty } from '@/presentation/pages/account-informations/components'

import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  accountInformations: LoadAccountInformations.Model
}

const List: React.FC<Props> = ({ accountInformations }: Props) => {
  return (
    <ul data-testid="informations-list">
      <div className={Styles.listWrap}>
        {accountInformations !== null
          ? Object.entries(accountInformations).map((keyValue) => <AccountInformationsItem key={keyValue[0]} keyValue={keyValue} />)
          : <AccountInformationsItemEmpty />
        }
      </div>
      <footer>
        <Link data-testid="link" to="/creatproject">Creat a project</Link><br/><br/>
        <Link data-testid="link" to="/projects">See all projects</Link>
      </footer>
    </ul>
  )
}

export default List
