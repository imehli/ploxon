const fallback = require('express-history-api-fallback')
const express = require('express')
const { join } = require('path')
const FRONTEND_PORT = 80

const app = express()
const root = join(__dirname, 'dist')
app.use(express.static(root))
app.use(fallback('index.html', { root }))
app.listen(process.env.PORT || FRONTEND_PORT, () => console.log(`Front server running at port :${FRONTEND_PORT}`))
