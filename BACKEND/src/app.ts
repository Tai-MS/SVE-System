import { clearDB, connectDB, updateDB } from "#db/connection"
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
    /* 
    Crea usuarios con 5 permisos diferentes: {
      PROFESOR ->  profesor@profesor.com
      ADMIN -> admin@admin.com
      ESTUDIANTE -> estudiante@estudiante.com
      BEDELIA -> bedelia@bedelia.com
      DIRECVTIVO -> directivo@directivo.com
      (TODAS LAS CONTRASEÑA SON: "contraseña")
    } 
    */
    // await crearUsuarios()
    await connectDB()
  })
}

bootstrap()
//
