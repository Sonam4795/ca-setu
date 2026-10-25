import mongoose from 'mongoose';

export async function connectDB() {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.warn('\n⚠️ [CA Setu Backend] MONGO_URI is not defined in environment variables.');
    console.warn('ℹ️ Running backend with in-memory / fallback mock persistence. Provide MONGO_URI in .env to connect live MongoDB.\n');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ [MongoDB Connected] Database Host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ [MongoDB Connection Error]: ${error.message}`);
    console.warn('ℹ️ The backend will continue operating gracefully.\n');
    return false;
  }
}
