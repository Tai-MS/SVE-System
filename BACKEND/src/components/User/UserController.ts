import { NextFunction, Request, RequestHandler, Response } from "express";
import UserService from "./UserService";
import passport from "passport";
import User from "./UserModel";
import dotenv from "dotenv";
import XLSX from "xlsx";
import { excelSchema } from "../../schemas/userSchemas";
import { Usuarios } from "../../schemas/userSchemas";

dotenv.config();

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const call = await UserService.getAll();

    return res.status(200).send(call);
  } catch (error) {
    res.status(204).send(error);
  }
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const email: string = req.query.email as string;

    const call = await UserService.getUser(email);

    res.status(200).send(call);
  } catch (error) {
    res.status(204).send(error);
  }
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const email: string = req.query.email as string;

    const call = await UserService.getUser(email);

    res.status(200).send(call);
  } catch (error) {
    res.status(204).send(error);
  }
}

async function ImportarUsuarios(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = (req as unknown as { file: Express.Multer.File }).file;
    const workbook = XLSX.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    const verify = await excelSchema.safeParseAsync(data);
    if (!verify.success) {
      res.status(400).json({
        respuesta: "Los datos del excel no son compatibles para la importación",
      });
    }
    const resultado = await UserService.guardarUsuariosInportados(
      data as Usuarios
    );
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const email: string = req.query.email as string;

    const call = await UserService.getUser(email);

    res.status(200).send(call);
  } catch (error) {
    res.status(204).send(error);
  }
}

async function disableUser(req: Request, res: Response, next: NextFunction) {
  try {
    const email: string = req.query.email as string;

    const call = await UserService.getUser(email);

    res.status(200).send(call);
  } catch (error) {
    res.status(204).send(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  const fields = req.body;
  res.cookie("auth-token", res.locals.token, { httpOnly: true });
  passport.authenticate("login", { failureRedirect: "/faillogin" })(
    req,
    res,
    async () => {
      await UserService.login(fields);
      return res.status(200).send("logeado");
    }
  );
}

async function loginGoogle(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    "google",
    async (error: unknown, user: User, info: any) => {
      if (error) {
        return next(error);
      }
      console.log("///////////////////////");
      console.log(error);
      console.log("----------------------");
      console.log(user);
      console.log("----------------------");
      console.log(info);
      console.log("///////////////////////");

      if (!user) {
        return res.send("error");
      }
      req.logIn(user, function (error) {
        if (error) {
          return next(error);
        }
        return res.send("logeado");
      });
    }
  )(req, res, next);
}

export default {
  getAll,
  getUser,
  createUser,
  updateUser,
  disableUser,
  loginGoogle,
  ImportarUsuarios,
};
