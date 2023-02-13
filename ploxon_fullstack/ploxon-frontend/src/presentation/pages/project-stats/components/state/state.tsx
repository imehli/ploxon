import Styles from './state-styles.scss'
import { onProjectAnswerState } from '@/presentation/pages/project-stats/components'
import { ProjectStatsQueryModel } from '@/domain/models'

import { useRecoilValue } from 'recoil'
import React from 'react'

type Props = {
  state: ProjectStatsQueryModel
}

const Answer: React.FC<Props> = ({ state }: Props) => {
  const { onAnswer } = useRecoilValue(onProjectAnswerState)
  const activeClassName = state ? Styles.active : ''
  // const stateClick = (event: React.MouseEvent): void => {
  //   if (event.currentTarget.classList.contains(Styles.active)) {
  //     return
  //   }
  //   onAnswer(state)
  // }
  return (
    <li
      data-testid="state-wrap"
      className={[Styles.stateWrap, activeClassName].join(' ')}
      // onClick={stateClick}
    >
      {/* {state && <img data-testid="image" src={state.image} alt={state.state} />}
      <span data-testid="state" className={Styles.state}>{state.state}</span>
      <span data-testid="percent" className={Styles.percent}>{state.percent}%</span> */}
    </li>
  )
}

export default Answer
