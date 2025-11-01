
import 'dotenv/config'// carga las variables de entorno
import mongoose from "mongoose"


async function conectaDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Falta la variable de entorno MONGODB_URI");
    throw new Error("MONGODB_URI no está configurada");
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      tls: true,
      tlsAllowInvalidCertificates: false,
      tlsInsecure: false,
      family: 4,
      retryWrites: true,
      w: "majority"
    });
    console.log("Conexión a MongoDB establecida correctamente");
  } catch (err) {
    console.error("Error conectando a MongoDB:", err.message);
    if (err.reason) console.error("Detalle:", err.reason);
    throw err;
  }
}


export default conectaDB;
