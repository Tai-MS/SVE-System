import { clearDB, connectDB } from "#db/connection"
import { create_server } from "#Utils/createServer"
import "dotenv/config"
const app = create_server()

const PORT = process.env.PORT || 3030

async function bootstrap() {
  const app = await create_server()

  app.listen(PORT, async () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`)
    // await clearDB()
    await updateDB()
    // await connectDB()
  })
}

bootstrap()
