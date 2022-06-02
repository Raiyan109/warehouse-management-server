const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 5000

const app = express()

// Middleware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.asf7a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect()
        const itemCollection = client.db('inventoryAssignment').collection('item')

        // Load data 
        app.get('/item', async (req, res) => {
            const query = {}
            const cursor = itemCollection.find(query)
            const items = await cursor.toArray()
            res.send(items)
        })

        app.get('/item/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const item = await itemCollection.findOne(query)
            res.send(item)
        })

        // Add quantity
        app.post('/item/:id', async (req, res) => {
            // const id = req.params.id 
            const keys = req.body
            const query = { _id: { $in: keys } }
            const cursor = itemCollection.find(query)
            const items = await cursor.toArray()
            console.log(keys)
            // const result = await itemCollection.insertOne(newItem)
            res.send(items)
        })

        app.post('/item', async (req, res) => {
            const newItem = req.body
            const result = await itemCollection.insertOne(newItem)
            res.send(result)
        })
        // DELETE ITEM
        app.delete('/item/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await itemCollection.deleteOne(query)
            res.send(result)
        })

        app.post('/login', async (req, res) => {
            const user = req.body
            console.log(user);
            const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
                expiresIn: '1d'
            })
            res.send({ accessToken })
        })

    }
    finally {

    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('running assignment servers')
})

app.listen(port, () => {
    console.log('listening to port', port)
})

