import app from './app'

const PORT = process.env.PORT ?? 4000
const HOST = process.env.HOST ?? 'http://localhost'

app.listen(PORT, () => {
  console.log(`[server] Running on ${HOST}:${PORT}`)
})
