import { clearDB, updateDB, connectDB } from "#db/connection"
import { create_server } from "#Utils/createServer"
const app = create_server()

const PORT = process.env.PORT || 3030

app.listen(PORT, async () => {
  updateDB()
})
