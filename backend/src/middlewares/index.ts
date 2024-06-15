import type { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ ok: false, errors: errors.array() })
  }
  next()
}
