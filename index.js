const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
// midlleware
app.use(cors());
app.use(express.json());
// mongodb uri
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.dikh4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// DB API
async function run() {
  try {
    await client.connect();
    // collections
    const productCollection = client
      .db("product-db")
      .collection("product-collection");
    const orderCollection = client
      .db("product-db")
      .collection("orders-collection");
    // all api connection
    app.get("/products", async (req, res) => {
      const query = {};
      const products = await productCollection.find(query).toArray();
      res.send(products);
    });
    // get orders data
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    });
    // order post api
    app.post("/order", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.send(result);
    });
    // orders get api
    app.get("/orders", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const orders = await orderCollection.find(query).toArray();
      res.send(orders);
    });
    // issue token api
    app.put("/token", async (req, res) => {
      const user = req.body;
    });
  } finally {
    //something
  }
}
run().catch(console.dir);
// initial API
app.get("/", (req, res) => {
  res.send("Red Onion Server Running");
});
app.listen(port, () => {
  console.log(port, "Is running");
});
