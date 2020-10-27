import { Request, Response } from 'express'

export default {
    async index(req: Request, res: Response) {
        return res.json({ msg: 'Listando burgers' })
    },

    async create(req: Request, res: Response) {
        return res.json({ msg: 'Criando novo burger' })
    },

    async update(req: Request, res: Response) {
        return res.json({ msg: 'Atualizando burger' })
    },

    async delete(req: Request, res: Response) {
        return res.json({ msg: 'Excluindo burger' })
    }
}