const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())


// shafiqulislamsagor277
// c92koyX9yrkqUtJM



const uri = "mongodb+srv://shafiqulislamsagor277:c92koyX9yrkqUtJM@ms-creator.yqb9vtj.mongodb.net/?retryWrites=true&w=majority&appName=ms-creator";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("usersDB");
        const userCollection = database.collection("user");

        app.get('/user', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })

        app.post('/user', async (req, res) => {
            const user = req.body
            console.log('new user', user);
            const result = await userCollection.insertOne(user);
            res.send(result)
        })

        app.delete('/user/:id', async(req, res) => {
            const id = req.params.id;
            console.log('params', id);
            const query = { _id : new ObjectId(id) };
            const result =await userCollection.deleteOne(query);
            res.send(result)
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Simple crud is running')
})

app.listen(port, () => {
    console.log(`Simple crud is running on port, ${port}`);
})