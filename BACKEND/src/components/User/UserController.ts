import { RequestHandler } from "express";
import { UserService } from "./UserService";
import XLSX from "xlsx";

const userService = new UserService();

export class UserController {
  agregarUsuarios: RequestHandler = async (req, res) => {
    try {
      const file = (req as unknown as { file: Express.Multer.File }).file;
      const workbook = XLSX.readFile(file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
}
