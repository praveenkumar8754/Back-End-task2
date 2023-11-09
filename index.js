import express from 'express'
import AppRoutes from './src/routes/index.js'

const app = express()
app.use(express.json())
app.use('/', AppRoutes)

app.listen(8000,()=>console.log("Server Listening to the port 8000"))