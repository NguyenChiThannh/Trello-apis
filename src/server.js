/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import cookieParser from 'cookie-parser'

const START_SEVER = () => {

  const app = express()

  app.use(cors(corsOptions))

  // Config cookie
  app.use(cookieParser())

  //Enable req.body json data
  app.use(express.json())

  // use APIs V1
  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.listen( env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3.I am  running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })
  // Control các tao tác thoát
  exitHook(() => {
    CLOSE_DB()
    console.log('4. Đã ngắt kết nối tới MongoDB Cloud Atlas')
  })
}

(async () => {
  try {
    console.log('1.Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('2.Connected to MongoDB Cloud Atlas')
    await START_SEVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// // Chỉ khi kết nối Database thành công thì mới Start Sever lên
// console.log('1.Connecting to MongoDB Cloud Atlas...')
// CONNECT_DB()
//   .then(() => console.log('2.Connected to MongoDB Cloud Atlas'))
//   .then(() => START_SEVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
