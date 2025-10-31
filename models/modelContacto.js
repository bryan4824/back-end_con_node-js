import mongoose from "mongoose";

const contactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,//para recortar espacios al principio y final de los datos ingresados
        unique: true
    },
    edad: {
        type: Number,
        require: false,
        trim: true,
        unique: false
    },
    correo:{
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    mensaje:{
        type: String,
        require: false,
        trim: true,
        unique: true

    }
});

export default mongoose.model("Contacto", contactoSchema) // nombre de la clase y la tabla