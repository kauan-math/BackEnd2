import type { Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import { handleError } from "../../helpers/handleError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export default {
  login: async (request: Request, response: Response) => {
        try{
            const { email, senha} = request.body;

            const employee = await prisma.funcionarios.findUnique({
                where: {
                    email
                },
            });

            if (!employee || !bcrypt.compareSync(senha, employee.senha)) {
                return response.status(404).json("Email e/ou senha inválidos")
            }

          const token = jwt.sign(employee, process.env.JWT_SECRET!, {
            expiresIn: "10s",
          })

          return response.status(200).json({access_token: token})
        }catch (e) {
            return handleError(e, response)
        }
    },
  create: async( request: Request,response: Response) => {
        try{
            const {nome, cargaHoraria, descricao, professor, email, senha, admin, user} = request.body;

            if (!nome || !cargaHoraria || !descricao) {
                return response.status(400).json({error: "Dados do Funcionário incompletos"})
            }

            if (!user?.admin) {
                return response.status(403).json( "Acesso negado" );
            }

            if(!nome || !email || !senha){
                return response.status(400).json({error: "Dados do Funcionário incompletos"})
            }

            const employee = await prisma.funcionarios.create({
                data: {
                    nome,
                    email,
                    senha: bcrypt.hashSync(senha, +process.env.BCRYPT_ROUDS!),
                    admin,
                },
            })
            return response.status(201).json(employee);
        } catch(e){
          console.error(e);
            return handleError(e, response);
        }
    },
    
    list: async (request: Request, response: Response) => {
        try{
            const employees = await prisma.funcionarios.findMany();
            return response.status(200).json(employees);
        }catch(e){
            return handleError(e, response);
        }
    },

  getByid: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const employee = await prisma.funcionarios.findUnique({
        where: {
          id: +id,
        },
      });
      return response.status(200).json(employee);
    } catch (e) {
      return handleError(e, response);
    }
  },

  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { nome, email,  senha, admin, user } = request.body;

      if(!user.admin && user.id !== +id) {
        return response.status(403).json( "Não autorizado" );
      }

      const employee = await prisma.funcionarios.update({
        data: {
          nome,
          senha,
          email,
          admin: user.admin ? admin : false,
        },
        where: { id: +id },
      });
      return response.status(200).json(employee);
    } catch (e) {
      return handleError(e, response);
    }
  },

  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { user } = request.body;
      const employee = await prisma.funcionarios.delete({
        where: {
          id: +id,
        },
      });
      return response.status(200).json(employee);
    } catch (e) {
      return handleError(e, response);
    }
  },
};
