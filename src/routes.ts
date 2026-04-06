import { Router, Request, Response } from "express";
import alunosController from "./controllers/alunos";
import cursosController from "./controllers/cursos"
import funcionariosController from "./controllers/funcionarios";
import { authentication } from "./middlewares/authentication";

const routes = Router();

routes.get("/", (_request: Request, response: Response) =>
  response.status(200).json({ succes: true }),
);

//2°metodo
routes.get("/alunos", authentication, alunosController.list);
routes.post("/alunos", authentication, alunosController.create);
routes.get("/alunos/:id", authentication, alunosController.getByid);
routes.put("/alunos/:id", authentication, alunosController.update);
routes.delete("/alunos/:id", authentication, alunosController.delete);

routes.get("/cursos", authentication, cursosController.list);
routes.get("/cursos/:id", authentication, cursosController.getByid);
routes.post("/cursos", authentication, cursosController.create);
routes.put("/cursos/:id", authentication, cursosController.update)
routes.delete("/cursos/:id", authentication, cursosController.delete)

routes.post('/matricular/:id', authentication, alunosController.matricular);
routes.delete('/desmatricular/:id', authentication, alunosController.desmatricular)

routes.get("/funcionarios",authentication, funcionariosController.list);
routes.get("/funcionarios/:id", authentication, funcionariosController.getByid);
routes.post("/funcionarios", authentication, funcionariosController.create);
routes.put("/funcionarios/:id", authentication, funcionariosController.update);
routes.delete("/funcionarios/:id", authentication, funcionariosController.delete);
routes.post("/funcionarios/login", funcionariosController.login);


export default routes;
