import request from 'supertest'
import app from '../../src/app'

describe('POST /api/v1/products', () => {
  it('should show a validation error', async () => {
    const response = await request(app).post('/api/v1/products').send({})
    expect(response.statusCode).toBe(422)
    expect(response.body.ok).toBe(false)
    expect(response.body.errors).toHaveLength(4)
  })

  it('should show a validation price error', async () => {
    const response = await request(app).post('/api/v1/products').send({
      name: 'Product 1',
      price: 0
    })
    expect(response.statusCode).toBe(422)
    expect(response.body.ok).toBe(false)
    expect(response.body.errors).toHaveLength(1)
  })

  it('should create a new product', async () => {
    const response = await request(app).post('/api/v1/products').send({
      name: 'Product 1',
      price: 50
    })
    expect(response.statusCode).toBe(201)
    expect(response.body.ok).toBe(true)
  })
})

describe('GET /api/v1/products', () => {
  it('should return a JSON with products', async () => {
    const response = await request(app).get('/api/v1/products')
    expect(response.statusCode).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body).toHaveProperty('products')
    expect(response.body.products).toHaveLength(1)
  })
})

describe('GET /api/v1/products/:id', () => {
  it('should return a 404 response for a non-existent product', async () => {
    const response = await request(app).get('/api/v1/products/10000')
    expect(response.statusCode).toBe(404)
    expect(response.body.ok).toBe(false)
  })

  it('should return a JSON with the product', async () => {
    const response = await request(app).get('/api/v1/products/1')
    expect(response.statusCode).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body).toHaveProperty('product')
  })
})

describe('PUT /api/v1/products/:id', () => {
  it('should show an error for not valid url', async () => {
    const response = await request(app).put('/api/v1/products/not-valid').send({
      name: 'Display',
      price: 10,
      availability: true
    })
    expect(response.statusCode).toBe(422)
    expect(response.body.ok).toBe(false)
    expect(response.body.errors).toHaveLength(1)
  })

  it('should show validation errors when trying to update the product', async () => {
    const response = await request(app).put('/api/v1/products/1').send({})
    expect(response.statusCode).toBe(422)
    expect(response.body.ok).toBe(false)
    expect(response.body.errors).toHaveLength(5)
  })

  it('should show an error validation for price greater than zero', async () => {
    const response = await request(app).put('/api/v1/products/1').send({
      name: 'Display',
      price: -3,
      availability: true
    })
    expect(response.statusCode).toBe(422)
    expect(response.body.ok).toBe(false)
    expect(response.body.errors).toHaveLength(1)
  })

  it('should return a 404 response for a non-existent product', async () => {
    const response = await request(app).put('/api/v1/products/10000').send({
      name: 'Display',
      price: 10,
      availability: true
    })
    expect(response.statusCode).toBe(404)
    expect(response.body.ok).toBe(false)
    expect(response.body.message).toBe('Product not found')
  })

  it('should update the product and show a success message', async () => {
    const response = await request(app).put('/api/v1/products/1').send({
      name: 'Display',
      price: 999,
      availability: false
    })
    expect(response.statusCode).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.message).toBe('Product updated')
  })
})

describe('PATCH /api/v1/products/:id', () => {
  it('should show an error for not valid url', async () => {
    const response = await request(app).patch('/api/v1/products/not-valid')
    expect(response.statusCode).toBe(422)
    expect(response.body.ok).toBe(false)
    expect(response.body.errors).toHaveLength(1)
  })

  it('should return a 404 response for a non-existent product', async () => {
    const response = await request(app).patch('/api/v1/products/10000')
    expect(response.statusCode).toBe(404)
    expect(response.body.ok).toBe(false)
    expect(response.body.message).toBe('Product not found')
  })

  it('should update the product and show a success message', async () => {
    const response = await request(app).patch('/api/v1/products/1')
    expect(response.statusCode).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.message).toBe('Product updated')
  })
})

describe('DELETE /api/v1/products/:id', () => {
  it('should show an error for not valid url', async () => {
    const response = await request(app).delete('/api/v1/products/not-valid')
    expect(response.statusCode).toBe(422)
    expect(response.body.ok).toBe(false)
    expect(response.body.errors).toHaveLength(1)
  })

  it('should return a 404 response for a non-existent product', async () => {
    const response = await request(app).delete('/api/v1/products/10000')
    expect(response.statusCode).toBe(404)
    expect(response.body.ok).toBe(false)
    expect(response.body.message).toBe('Product not found')
  })

  it('should delete the product and show a success message', async () => {
    const response = await request(app).delete('/api/v1/products/1')
    expect(response.statusCode).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.message).toBe('Product deleted')
  })
})
