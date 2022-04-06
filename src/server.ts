import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/index'


dotenv.config()

const app = express()

// middlware
app.use(express.json())

app.use(express.urlencoded()) 


// Routes

app.use('/api', routes)



// Start server listening

const port = process.env.PORT || 8000;

app.listen(port, () => {

  console.log(`Server is listening on port ${port}`)

})