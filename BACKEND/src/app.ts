import { create_server } from "./utils/createServer";

const app = create_server();

const PORT = process.env.PORT || 3030;

app.listen(process.env.PORT, () => {
  console.log(
    `Servidor iniciado correctamente en http://localhost:${process.env.PORT}/`
  );
});
