import { clearDB, connectDB, updateDB } from "#db/connection"
// import { crearUsuarios } from "#db/crearUsuarios"
import { create_server } from "#Utils/createServer"
import { crearUsuarios } from "#db/usuariosInsert"
import "dotenv/config"

const PORT = process.env.PORT || 3030

async function bootstrap() {
  const app = await create_server()

  app.listen(PORT, async () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`)
    // await clearDB()
    // await updateDB()
    // crearUsuarios()
    await connectDB()
  })
}

bootstrap()
//
