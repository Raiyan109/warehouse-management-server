const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()


// Middleware
app.use(cors())
app.use(express.json())

// get connection string from mongodb database


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vxdca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log('assignment 11 connected')
    // perform actions on the collection object
    client.close();
});



app.get('/', (req, res) => {
    res.send('running assignment 11')
})

app.listen(port, () => {
    console.log('listening port from ass-11', port)
})
