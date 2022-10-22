import express from 'express'

const app = express()
const port = 3850
app.get('/', (_, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const getServerUrl = () => {
  return `http://localhost:${port}`
}

export default getServerUrl
