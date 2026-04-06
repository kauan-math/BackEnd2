import type { Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import { handleError } from "../../helpers/handleError.js";


export default {
  create: async( request: Request,response: Response) => {
        try{
            const {nome, email, idade, cpf} = request.body;

            if (!nome || !email || !idade || !cpf){
                return response.status(400).json({error: "Dados do Aluno incompletos"})
            }

            const user = await prisma.alunos.create({
                data: {
                    nome,
                    email,
                    idade,
                    cpf,
                },
            })
            console.log("Usuário criado.");
            return response.status(201).json(user);
        } catch(e: any){
            return handleError(e, response);
        }
    },
    
    list: async (request: Request, response: Response) => {
        try{
            const users = await prisma.alunos.findMany({
                include: {cursos:true}
            });
            return response.status(200).json(users);
        }catch(e){
            return handleError(e, response);
        }
    },

  getByid: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const user = await prisma.alunos.findUnique({
        where: {
          id: +id,
        },
      });
      return response.status(200).json(user);
    } catch (e) {
      return handleError(e, response);
    }
  },

  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { nome, idade, email, cpf } = request.body;
      const user = await prisma.alunos.update({
        data: {
          nome,
          idade,
          email,
          cpf,
        },
        where: { id: +id },
      });
      return response.status(200).json(user);
    } catch (e) {
      return handleError(e, response);
    }
  },

  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const user = await prisma.alunos.delete({
        where: {
          id: +id,
        },
      });
      return response.status(200).json(user);
    } catch (e) {
      return handleError(e, response);
    }
  },

  matricular: async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { cursosIds } = request.body;
    const user = await prisma.alunos.update({
      where: { id: Number(id) },
      data: {
        cursos: {
          connect: cursosIds.map((cursoId: number) => ({ id: cursoId })),
        }
      },
      include: {           
        cursos: true
      }
    });
    return response.status(201).json(user);
  } catch (e: any) {
    return handleError(e, response);
  }
},

    desmatricular: async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { cursosIds } = request.body;
    const alunoId = Number(id);
    const aluno = await prisma.alunos.findUnique({
      where: { id: alunoId },
      include: { cursos: true }
    });
    if (!aluno) {
      return response.status(404).json("Aluno não encontrado");
    }
    const cursosQueFicam = aluno.cursos.filter(curso => !cursosIds.includes(curso.id)).map(curso => ({ id: curso.id }));
    const user = await prisma.alunos.update({
      where: { id: alunoId },
      data: {
        cursos: {
          set: cursosQueFicam
        }
      },
      include: { cursos: true }
    });
    return response.status(200).json(user);
  } catch (e: any) {
    return handleError(e, response);
  }
},
};
