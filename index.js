//el servidor siempre vva en el index y se condigura en el package.json
//para inicializar el servidor --> npm run start
//localhost:3000
import express from "express"
import rutas from "./routes/rutas.js"
import conectaDB from "./db/bd.js"
import dotenv from 'dotenv';
dotenv.config();

const app = express()

async function conexion() {
	await conectaDB();	
}

conexion();

app.use(express.urlencoded({extended: true}))

app.set("view engine", "ejs")// establece el motor de bisqueda
app.use("/", rutas)

const PORT = process.env.PORT || 3000

app.listen(PORT, function(){
	console.log("Aplicacion en puerto: " + PORT)
})

