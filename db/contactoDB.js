import Contacto from "../models/modelContacto.js"
import conectaDB from "../db/bd.js"

export async function nuevoContacto({nombre, edad, correo, mensaje}){
    const contacto = new Contacto({nombre, edad, correo, mensaje});
    const respuestaMongoo = await contacto.save();
    return respuestaMongoo

}

export async function mostrarContactos() {
    try {
        const contactosDB = await Contacto.find({}); // busca todos los docuemto en la collection
        console.log(contactosDB);
        return contactosDB;
    } catch (error) {
        error.log("Error al obtener contactos: ", error)
    }
}

export async function buscarPorId(id) {
    const contactoDB = await Contacto.findById(id);
    return contactoDB;
}

export async function editarContacto({id, nombre, edad, correo}) {
    const respuestaMongo = await Contacto.findByIdAndUpdate(id, {nombre, edad, correo})
    return respuestaMongo
}

export async function eliminarContacto(id) {
    const respuestaMongo = await Contacto.findByIdAndDelete(id)
    return respuestaMongo
}

export async function buscarContacto(nombre) {
    //const contactoBD = await Contacto.find({nombre})
    const contactoBD = await Contacto.find({
	$or: [
		{ nombre: { $regex: nombre, $options: "i" } }
	]
	});
    return contactoBD
}

