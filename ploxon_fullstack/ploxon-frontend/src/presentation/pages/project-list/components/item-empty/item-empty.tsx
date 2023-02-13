import Styles from './item-empty-styles.scss'

import React from 'react'

const ProjectItemEmpty: React.FC = () => {
  return (
    <>
      <li className={Styles.projectItemEmpty}></li>
      <li className={Styles.projectItemEmpty}></li>
      <li className={Styles.projectItemEmpty}></li>
      <li className={Styles.projectItemEmpty}></li>
    </>
  )
}

export default ProjectItemEmpty
