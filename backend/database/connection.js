const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // We use process.env.MONGO_URI which we defined in our .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit the application with failure
    process.exit(1);
  }
};

module.exports = connectDB;