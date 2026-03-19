import type { Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import prismaErrorCodes from "../../config/prismaErrorCodes.json";
import { Prisma } from "../../generated/prisma/client.js";


export default {
    list: async (request: Request, response: Response) => {
    try {
      const users = await prisma.alunos.findMany({
        include: { Cursos: true }
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
      const { nome, cpf, email, idade } = request.body;
      const user = await prisma.alunos.create({
        data: {
          nome,
          cpf,
          email,
          idade,
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

  getByid: async (reqeust: Request, response: Response) => {
    try {
      const { id } = reqeust.params;
      const user = await prisma.alunos.findUnique({
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
      const user = await prisma.alunos.delete({
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
};
