export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://testDBUser:password4testDBUser@cluster0.nnclx1o.mongodb.net/?retryWrites=true&w=majority',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H'
}
