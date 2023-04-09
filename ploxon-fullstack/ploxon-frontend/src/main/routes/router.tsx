import { makeLogin, makeSignUp, makeProjectList, makeProjectStats, makePloxonHome, makeAccountInformations, makeCreateProject } from '@/main/factories/pages'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters'
import { PrivateRoute } from '@/main/proxies'
import { currentAccountState } from '@/presentation/components'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import React from 'react'

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }
  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Switch>
          <Route path="/ploxonHome" exact component={makePloxonHome} />
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/projects" exact component={makeProjectList} />
          <PrivateRoute path="/account" exact component={makeAccountInformations} />
          <PrivateRoute path="/creatproject" exact component={makeCreateProject} />
          <PrivateRoute path="/projects/:projectId" component={makeProjectStats} />
          <Route path="/" exact component={makePloxonHome} />
          <Route path="/*" exact component={makePloxonHome} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default Router
