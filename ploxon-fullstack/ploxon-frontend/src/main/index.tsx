import '@/presentation/styles/global.scss'
import '@/presentation/internationalization/i18n'
import Router from '@/main/routes/router'
import ReactDOM from 'react-dom'
import React from 'react'

ReactDOM.render(
  <Router />,
  document.getElementById('main')
)
