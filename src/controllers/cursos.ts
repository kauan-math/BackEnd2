
import type { Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import prismaErrorCodes from "../../config/prismaErrorCodes.json";
import { Prisma } from "../../generated/prisma/client.js";


export default {
    list: async (request: Request, response: Response) => {
    try {
      const users = await prisma.cursos.findMany({
        include: { alunoCursos: true }
      });
      return response.status(200).json(users);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // @ts-ignore
        return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
      }
      return response.status(500).json("Unkown error. Try again later");
    }
  },
  create: async (request: Request, response: Response) => {
    try {
      const { nome, professor , cargaHoraria, descricao } = request.body;
      const user = await prisma.cursos.create({
        data: {
          nome,
          professor,
          cargaHoraria,
          descricao
        },
      });

      return response.status(201).json(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // @ts-ignore
        return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
      }
      return response.status(500).json("Unkown error. Try again later");
    }
  },

  getByid: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const user = await prisma.cursos.findUnique({
        where: {
          id: +id,
        },
      });
      return response.status(200).json(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // @ts-ignore
        return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
      }
      return response.status(500).json("Unkown error. Try again later");
    }
  },
  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { nome, professor , cargaHoraria, descricao } = request.body;
      const user = await prisma.cursos.update({
        data: {
          nome,
          professor,
          cargaHoraria,
          descricao
        },
        where: { id: +id },
      });
      return response.status(200).json(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // @ts-ignore
        return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
      }
      return response.status(500).json("Unkown error. Try again later");
    }
  },
  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const user = await prisma.cursos.delete({
        where: {
          id: +id,
        },
      });
      return response.status(200).json(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // @ts-ignore
        return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
      }
      return response.status(500).json("Unkown error. Try again later");
    }
  },
  matricular: async (request: Request, response: Response) => {
    try {
      const { alunoId, cursoId } = request.body;
      const matricula = 
      await prisma.alunoCursos.create({
        data: {
          alunoId,
          cursoId,
          curso: {
            connect: { id: cursoId }
        },
          aluno: {
            connect: { id: alunoId }
        },
        assignedBy: "Admin"

    }});
      return response.status(200).json(matricula);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // @ts-ignore
        return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
      }
      return response.status(500).json("Unkown error. Try again later");
    }
  }

};
