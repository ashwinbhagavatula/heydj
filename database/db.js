import mongoose from 'mongoose';

let isConnected = false; // track the connection

const connectMongo = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Cluster0",
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }

}

export default connectMongo