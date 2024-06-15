import { Sequelize } from 'sequelize'
import 'dotenv/config'

const url = process.env.POSTGRES_URL

if (url === undefined) {
  throw new Error('[db] POSTGRES_URL is not set')
}

const db = new Sequelize(url, { logging: false })

export default db
