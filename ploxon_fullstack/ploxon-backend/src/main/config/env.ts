export default {
  mongoUrl: process.env.MONGO_URL || 'http://localhost:5656',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'secret'
}
