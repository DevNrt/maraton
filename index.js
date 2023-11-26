import express from "express"
import croutes from '/Users/nicolasrodriguez/Downloads/maraton_back/routes/croutes.js'
import cors from 'cors'


const app = express()

app.use(cors())
app.use(express.json());

app.use(croutes)



app.listen(8000, () => {
    console.log('running on port 8000')
})