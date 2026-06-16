const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    let mongo_uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@ac-7fkz1tq-shard-00-00.oherg7t.mongodb.net:27017,ac-7fkz1tq-shard-00-01.oherg7t.mongodb.net:27017,ac-7fkz1tq-shard-00-02.oherg7t.mongodb.net:27017/?ssl=true&replicaSet=atlas-fo7ymf-shard-0&authSource=admin&appName=Cluster0/${process.env.MONGO_DB}`
    await mongoose.connect(mongo_uri);
    console.log("MongoDB connected");
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;