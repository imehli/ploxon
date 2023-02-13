import Styles from './link-text-styles.scss'
import React from 'react'

type Props = {
  to: string
  title: string
  children?: React.ReactNode
}

const LinkText: React.FC<Props> = ({ to, title, children }: Props) => {
  return (
    <a className={Styles.linkTextWrap} href={to || '#'} target="_blank" title={title || ''} rel="noreferrer">
        {children}
    </a>
  )
}

export default LinkText
