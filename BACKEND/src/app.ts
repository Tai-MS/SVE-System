import { create_server } from "./utils/createServer.ts";

const app = create_server();

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Puerto ${PORT}`);
});

app.listen(process.env.PORT, () => {
  console.log("Servidor iniciado correctamente en http://localhost:8080/");
});
