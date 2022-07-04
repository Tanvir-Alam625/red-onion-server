const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
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
    const productCollection = client
      .db("product-db")
      .collection("product-collection");
    app.get("/products", async (req, res) => {
      const query = {};
      const products = await productCollection.find(query).toArray();
      res.send(products);
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
