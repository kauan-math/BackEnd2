import { Router } from "express";

import alunosController from "./controllers/alunos.js";
import cursosController from "./controllers/cursos.js"
import type { Request } from "express/lib/request.js";
import type { Response } from "express/lib/response.js";
const routes = Router();

routes.get("/", (request: Request, response: Response) =>
  response.status(200).json({ succes: true }),
);

//rotas de alunos
//1°metodo
routes.get("/alunos", (request: Request, response: Response) =>
  alunosController.list(request, response),
);

routes.get("/cursos", (request: Request, response: Response) =>
  cursosController.list(request, response),
);

routes.get("/cursos", (request: Request, response: Response) =>
  cursosController.list(request, response),
);
//2°metodo
routes.get("/alunos", alunosController.list);
routes.get("/alunos/:id", alunosController.getByid);
routes.post("/alunos", alunosController.create);
routes.put("/alunos/:id", alunosController.update)
routes.delete("/alunos/:id", alunosController.delete)

routes.get("/cursos", cursosController.list);
routes.get("/cursos/:id", cursosController.getByid);
routes.post("/cursos", cursosController.create);
routes.put("/cursos/:id", cursosController.update)
routes.delete("/cursos/:id", cursosController.delete)

routes.put('/matricular/:id', alunosController.matricular);
routes.delete('/desmatricular/:id', alunosController.desmatricular)

export default routes;
