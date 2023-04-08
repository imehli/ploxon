import Styles from './item-styles.scss'
import React from 'react'

type Props = {
  keyValue: [string, string]
}

const AccountInformationsItem: React.FC<Props> = ({ keyValue }: Props) => {
  return (
    <li>
      <div className={Styles.rowWrap}>
        <div className={Styles.key}>
          <p data-testid="information">{keyValue[0]}</p>
        </div>
        <div className={Styles.value}>
          <p data-testid="information">{keyValue[1]}</p>
        </div>
      </div>
    </li>
  )
}

export default AccountInformationsItem
