import type { Request, Response, NextFunction } from 'express'
import { Product } from '../models'

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Product.create(req.body)
    res.status(201).json({ ok: true, message: 'Product created' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.findAll()
    res.status(200).json({ ok: true, products })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

export const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (product === null) {
      res.status(404).json({ ok: false, message: 'Product not found' })
      return
    }

    res.status(200).json({ ok: true, product })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (product === null) {
      res.status(404).json({ ok: false, message: 'Product not found' })
      return
    }

    await product.update(req.body)
    res.status(200).json({ ok: true, message: 'Product updated' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

export const toggleAvailable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (product === null) {
      res.status(404).json({ ok: false, message: 'Product not found' })
      return
    }

    await product.update({
      availability: !Boolean(product.dataValues.availability).valueOf()
    })

    res.status(200).json({ ok: true, message: 'Product updated' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const product = await Product.destroy({ where: { id } })

    if (product === 0) {
      res.status(404).json({ ok: false, message: 'Product not found' })
      return
    }

    res.status(200).json({ ok: true, message: 'Product deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
    next()
  }
}
