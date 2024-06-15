import { Product } from '../models'

const emptyDb = async () => {
  try {
    await Product.destroy({ where: {}, truncate: true, restartIdentity: true })

    console.log('[server] Database emptyed')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (process.argv[2] === '--e') {
  emptyDb()
}
