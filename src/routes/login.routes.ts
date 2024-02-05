import { Router } from "express";
import { loginController } from "../controllers/login.controller";

export const loginRouter: Router = Router();
loginRouter.use("/login", loginRouter);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     description: Autentica um usuário com as credenciais fornecidas e retorna um token JWT na resposta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso e token JWT retornado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string  # Tipo do token JWT
 *       400:
 *         description: Credenciais inválidas
 */
loginRouter.post("/", loginController);
