import mongoose from "mongoose";

async function connectDatabase() {
      try {
            const connect = await mongoose.connect(process.env.MONGODB_URI);
            console.log(`Mongo DB Connected...${connect.connection.host}`);
      } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
      }
}

export default connectDatabase;
