import { Router } from "express"
import { mostrarContactos, nuevoContacto, buscarPorId, editarContacto, eliminarContacto, buscarContacto}  from "../db/contactoDB.js";
import nodemon from "nodemon"

const router = Router()
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


var personas = ["Bryan", "Jorge", "Luis"]

router.get("/", function (req, res) {// esta es la ruta para la view de home 
	res.render("home", {personas})
})

router.get("/info", function (req, res) {// ruta sin parámetro
	res.render("info", {c: "default"})
})

router.get("/contacto", function (req, res) {// esta en la ruta para la view de contacto
	res.render("contacto")
})

router.post("/contacto", async function (req, res) {
	var nombre = req.body.nombre
	var edad = req.body.edad
	var email = req.body.correo
	var mensaje = req.body.mensaje
	console.log("Nombre: " + nombre + " Email: " + email + "Edad: "+ edad + "Mensaje: "+ mensaje)

	const respuestaMongo = await nuevoContacto(req.body)// mandar datos a la base de datos
	console.log(respuestaMongo);
	res.render("respuesta",{nombre, edad, email, mensaje}) 
})

router.get("/info/:c", function (req, res){// esta en la ruta para la view de acerca de nosotros
	var c = req.params.c
	console.log(c)
	res.render("info", {c: c})
})

router.get("/mostrarContactos", async function (req, res) {
	const contactosDB = await mostrarContactos()
	res.render("mostrarContactos", {contactosDB})// contactosDB se envia para mostrar con el for los datos de la DB
})

router.get("/editar/:id", async function editar(req, res) {
	try {
		const id = req.params.id; // recibimos un parametro a traves de la url el id 
		const contactoBD = await buscarPorId(id)
		res.render("editarContacto", {contactoBD})
	} catch (error) {
		console.log(error)
	}
})

router.post("/editarCambios", async function(req, res) {
	const respuesta = await editarContacto(req.body)
	console.log(respuesta, "editado")
	res.redirect("/mostrarContactos")
})

router.get("/eliminar/:id", async function (req, res) {
	const id = req.params.id; // recibimos un parametro a traves de la url el id 
	try {
		const contactoBD = await buscarPorId(id)
		res.render("eliminarContacto", {contactoBD})
	} catch (error) {
		console.log("Error no se pudo actualizar",error)
	}
})

router.get("/eliminarConfirmado/:id", async function(req, res) {
	const respuesta = await eliminarContacto(req.params.id)
	console.log(respuesta, "eliminado")
	res.redirect("/mostrarContactos")
})

router.post("/buscarContacto", async function (req, res) {
	const nombre = req.body.nombre
	const contactosDB = await buscarContacto(nombre)
	res.render("mostrarContactos", {contactosDB})
})


//render manda a llamr un archivo y redirect a una ruta especifica
//res.render se utiliza para
export default router
