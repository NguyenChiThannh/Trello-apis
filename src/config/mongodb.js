import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'
let trelloDatabaseInstance = null

// Khởi tạo một đối tượng mongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

//Kết nối tới Database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI
  await mongoClientInstance.connect()
  // Kết nói thành công thì lấy ra Database theo tên và gán ngược lại vào biến trelloDatabaseInstance ở trên
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

//Đóng kết nối tới Database
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

// Function GET_DB (không async) này có nhiệm vụ export ra cái Trello Database Instance sau khi đã connect thành công tới MongoDB để chúng ta sử dụng ở nhiều nơi khác nhau trong code
// Lưu ý phải đảm bảo chỉ luôn gọi cái getDB này sau khi kết nối thành công tới MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to database first')
  return trelloDatabaseInstance
}