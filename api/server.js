const app = require("./app");
const mongoose = require("mongoose");
const cluster = require("cluster")

const { addProductsIntoDb } = require("./modal/shop.modal");

app.get("/", (req, res) => {
  return res.status(200).json("hello world");
});

mongoose.connection.on("open", ()=> {
    console.log("mongoose connected successfully!")
})

if(cluster.isMaster){
  cluster.fork()
  cluster.fork()
}else {
  startServer()
}

async function startServer(){
    await mongoose.connect(process.env.MONGO_URL)
    await addProductsIntoDb()
    app.listen(process.env.PORT, () => {
        console.log(`listening at port ${process.env.PORT}`);
      });
      
}


