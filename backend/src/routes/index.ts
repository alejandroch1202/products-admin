import { Router, type Express } from 'express'
import products from './products'

const router = (app: Express) => {
  const router = Router()
  app.use('/api/v1', router)

  router.use('/products', products)
}

export default router
