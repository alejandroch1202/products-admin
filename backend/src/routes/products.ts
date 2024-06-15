import { Router } from 'express'
import {
  create,
  list,
  find,
  update,
  toggleAvailable,
  remove
} from './../controllers/products'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middlewares'

const router = Router()

router.post(
  '/',
  body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
  body('price')
    .notEmpty()
    .withMessage('El precio no puede ir vacío')
    .isNumeric()
    .withMessage('El precio debe ser numérico')
    .custom((value) => value > 0)
    .withMessage('El precio debe ser mayor a 0'),
  handleInputErrors,
  create
)

router.get('/', list)

router.get(
  '/:id',
  param('id')
    .notEmpty()
    .withMessage('El id no puede ir vacío')
    .isInt()
    .withMessage('Id no válido'),
  handleInputErrors,
  find
)

router.put(
  '/:id',
  param('id')
    .notEmpty()
    .withMessage('El id no puede ir vacío')
    .isInt()
    .withMessage('Id no válido'),
  body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
  body('price')
    .notEmpty()
    .withMessage('El precio no puede ir vacío')
    .isNumeric()
    .withMessage('El precio debe ser numérico')
    .custom((value) => value > 0)
    .withMessage('El precio debe ser mayor a 0'),
  body('availability')
    .isBoolean()
    .withMessage('Valor de disponibilidad no válido'),
  handleInputErrors,
  update
)

router.patch(
  '/:id',
  param('id')
    .notEmpty()
    .withMessage('El id no puede ir vacío')
    .isInt()
    .withMessage('Id no válido'),
  handleInputErrors,
  toggleAvailable
)

router.delete(
  '/:id',
  param('id')
    .notEmpty()
    .withMessage('El id no puede ir vacío')
    .isInt()
    .withMessage('Id no válido'),
  handleInputErrors,
  remove
)

export default router
