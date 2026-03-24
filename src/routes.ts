import { Router, Request, Response } from "express";
import alunosController from "./controllers/alunos.js";
import cursosController from "./controllers/cursos.js"
const routes = Router();

routes.get("/", (_request: Request, response: Response) =>
  response.status(200).json({ succes: true }),
);

//2°metodo
routes.get("/alunos", alunosController.list);
routes.post("/alunos", alunosController.create);
routes.put("/alunos/:id", alunosController.update);
routes.delete("/alunos/:id", alunosController.delete);

routes.get("/cursos", cursosController.list);
routes.post("/cursos", cursosController.create);
routes.put("/cursos/:id", cursosController.update)
routes.delete("/cursos/:id", cursosController.delete)

routes.post('/matricular/:id', alunosController.matricular);
routes.delete('/desmatricular/:id', alunosController.desmatricular)

export default routes;
