const app = require("./app");
const mongoose = require("mongoose");


mongoose.connection.on("open", ()=> {
    console.log("mongoose connected successfully!")
})

async function startServer(){
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(process.env.PORT, () => {
        console.log(`listening at port ${process.env.PORT}`);
      });
      
}

startServer()


